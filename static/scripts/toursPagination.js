function animation()
{
    let shopItems = document.querySelectorAll('.tour');
    shopItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
    
            const rotateX = ((y / rect.height) - 0.5) * 45;
            const rotateY = ((x / rect.width) - 0.5) * -45;
    
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const newsCards = document.querySelectorAll('.tour');
    const cardsPerPage = 2;
    const totalPages = Math.ceil(newsCards.length / cardsPerPage);
    let currentPage = 1;
    animation();

    function showPage(page) {
        newsCards.forEach((card, index) => {
            card.style.display = (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) ? 'block' : 'none';
        });
        document.getElementById('prev').disabled = (page === 1);
        document.getElementById('next').disabled = (page === totalPages);
        updatePageButtons(page);
    }

    function updatePageButtons(activePage) {
        const pageButtonsContainer = document.getElementById('page-buttons');
        pageButtonsContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('page-button');
            button.disabled = (i === activePage);
            button.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
            });
            pageButtonsContainer.appendChild(button);
        }
    }

    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});