document.addEventListener('DOMContentLoaded', async () => {
    const url = 'https://linkedin-data-api.p.rapidapi.com/?username=axmunoz';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '42aa1d7d3fmsh0815cbc3ca3d3cap1c1ad6jsn47e14ea225d6',
            'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        const teamInfoDiv = document.getElementById('team-info');
        if (result) {
            teamInfoDiv.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${result.profilePicture}" class="img-fluid rounded-start" alt="${result.firstName} ${result.lastName}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${result.firstName} ${result.lastName}</h5>
                                <p class="card-text"><strong>País:</strong> ${result.geo.country}</p>
                                <p class="card-text"><strong>Ciudad:</strong> ${result.geo.city}</p>
                            </div>
                        </div>
                    </div>
                </div><br>
            `;
        } else {
            teamInfoDiv.innerHTML = `<p>No se encontró información del equipo.</p>`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('team-info').innerHTML = `<p>Error al cargar la información del equipo.</p>`;
    }
});
