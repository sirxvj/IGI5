document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('employee-list');
    const headers = table.querySelectorAll('thead th');
    
    function sortTable(column, order)
    {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const columnIndex = Array.from(headers).findIndex(header => header.getAttribute('data-column') === column);

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

            if (order === 'asc')
            {
                return cellA.localeCompare(cellB, undefined, { numeric: true });
            }
            else
            {
                return cellB.localeCompare(cellA, undefined, { numeric: true });
            }
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    headers.forEach(header => {
        header.addEventListener('click', function(){
            const column = header.getAttribute('data-column');
            const currentOrder = header.getAttribute('data-order');
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            headers.forEach(h => h.classList.remove('asc', 'desc'));

            header.setAttribute('data-order', newOrder);
            header.classList.add(newOrder);

            sortTable(column, newOrder);
        });
    });
});