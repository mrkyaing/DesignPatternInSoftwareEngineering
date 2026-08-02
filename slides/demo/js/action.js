let bridgeChart;
let isAdapted = false;

function showSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('section-' + sectionId).classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    document.getElementById('nav-' + sectionId).classList.add('active');

    if (sectionId === 'bridge') {
        setTimeout(initBridgeChart, 100);
    }
}

function toggleAdapter() {
    const peg = document.getElementById('peg-vis');
    const ring = document.getElementById('adapter-vis');
    const status = document.getElementById('adapter-status');
    const btn = document.getElementById('btn-adapter');

    isAdapted = !isAdapted;

    if (isAdapted) {
        peg.style.opacity = '1';
        peg.style.borderRadius = '50%';
        ring.style.display = 'block';
        status.innerText = "Success: SquarePeg adapted to fit RoundHole.";
        status.className = "text-sm font-medium text-emerald-600 mb-4";
        btn.innerText = "Remove Adapter";
    } else {
        peg.style.opacity = '0.8';
        peg.style.borderRadius = '0%';
        ring.style.display = 'none';
        status.innerText = "Error: SquarePeg cannot fit RoundHole.";
        status.className = "text-sm font-medium text-red-500 mb-4";
        btn.innerText = "Attach Adapter";
    }
}

function initBridgeChart() {
    if (bridgeChart) return;
    const ctx = document.getElementById('bridgeChart').getContext('2d');
    bridgeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2x2', '3x3', '4x4', '5x5', '6x6'],
            datasets: [
                {
                    label: 'Inheritance (Exponential: N*M)',
                    data: [4, 9, 16, 25, 36],
                    backgroundColor: '#94a3b8',
                    borderRadius: 6
                },
                {
                    label: 'Bridge Pattern (Linear: N+M)',
                    data: [4, 6, 8, 10, 12],
                    backgroundColor: '#B8964B',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: { size: 11 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Classes', font: { weight: 'bold' } }
                },
                x: {
                    title: { display: true, text: 'Dimension Complexity (N & M)', font: { weight: 'bold' } }
                }
            }
        }
    });
}

function updateBridgeChart() {
    const val = parseInt(document.getElementById('bridge-slider').value);
    document.getElementById('slider-val').innerText = val;

    const labels = [];
    const inheritanceData = [];
    const bridgeData = [];

    for (let i = 2; i <= val + 2; i++) {
        labels.push(`${i}x${i}`);
        inheritanceData.push(i * i);
        bridgeData.push(i + i);
    }

    bridgeChart.data.labels = labels;
    bridgeChart.data.datasets[0].data = inheritanceData;
    bridgeChart.data.datasets[1].data = bridgeData;
    bridgeChart.update();
}

// Initialize first section
showSection('overview');