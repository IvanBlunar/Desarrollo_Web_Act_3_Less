document.addEventListener('DOMContentLoaded', async () => {
    const users = ['yojanstyvenh', 'ivan-humberto-bello-sandoval-15ba481a9'];
    const teamInfoDiv = document.getElementById('team-info');

    for (const username of users) {
        const url = `https://linkedin-data-api.p.rapidapi.com/?username=${username}`;
        const options = {
            method: 'GET',
            headers: {
                //la api-key tiene limitacion de solicitudes una vez exceda las solicitudes esta api Key 
                //una vez exceda las solicitudes esta api Key ya no sirve
                'x-rapidapi-key': 'a360c26962msh3f1813efa46aeb3p194a78jsnf8b2aeb125b6',
                'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (result) {
                const card = `
                    <div class="col-md-6 mb-3">
                        <div class="card" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${result.profilePicture}" class="img-fluid rounded-start" alt="${result.firstName} ${result.lastName}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${result.firstName} ${result.lastName}</h5>
                                        <p class="card-text">Ubicación: ${result.geo.city}, ${result.geo.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                teamInfoDiv.innerHTML += card;
            } else {
                teamInfoDiv.innerHTML += `<p class="col-md-6 mb-3">No se encontró información para ${username}.</p>`;
            }
        } catch (error) {
            console.error(error);
            teamInfoDiv.innerHTML += `<p class="col-md-6 mb-3">Error al cargar la información de ${username}.</p>`;
        }
    }
});
