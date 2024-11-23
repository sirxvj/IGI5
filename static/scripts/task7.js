
class Export {
    constructor(product, country, volume) {
        this.product = product;
        this.country = country;
        this.volume = volume;
    }

    get gproduct() {
        return this.product;
    }

    get gcountry() {
        return this.country;
    }

    get gvolume() {
        return this.volume;
    }

    toString() {
        return `Product: ${this.product}, Country: ${this.country}, Volume: ${this.volume} pcs`;
    }
}

class ExportAnalysis extends Export {
    constructor() {
        super();
        this.exports = [];
    }

    addExport(product, country, volume) {
        const newExport = new Export(product, country, volume);
        this.exports.push(newExport);
    }

    displayExports() {
        const exportList = document.getElementById('exportList');
        exportList.innerHTML = '';
        this.exports.forEach(exp => {
            const li = document.createElement('li');
            li.textContent = exp.toString();
            exportList.appendChild(li);
        });
    }

    analyzeProduct(productName) {
        const filteredExports = this.exports.filter(exp => exp.gproduct === productName);
        const countries = [...new Set(filteredExports.map(exp => exp.gcountry))];
        const totalVolume = filteredExports.reduce((sum, exp) => sum + exp.gvolume, 0);

        const resultsDiv = document.getElementById('results');
        if (filteredExports.length > 0) {
            resultsDiv.innerHTML = `
                <p>Countries importing "${productName}": ${countries.join(', ')}</p>
                <p>Total export volume: ${totalVolume} pcs</p>
            `;
        } else {
            resultsDiv.innerHTML = `<p>No data found for "${productName}".</p>`;
        }
    }
}


const analysis = new ExportAnalysis();

document.getElementById('exportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const product = document.getElementById('product').value;
    const country = document.getElementById('country').value;
    const volume = parseInt(document.getElementById('volume').value, 10);

    analysis.addExport(product, country, volume);
    analysis.displayExports();
    analysis.analyzeProduct(product);
});