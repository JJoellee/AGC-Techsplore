document.addEventListener('DOMContentLoaded', () => {
    const materialContainer = document.getElementById('material-container');
    const teamFilter = document.getElementById('team-filter');
    
    const materials = {
        data: ['Copy of Copy of Data Science Template AGC.pdf', 'Day 1- Techsplore Intro to Data Science.pdf'],
        executive: ['Ethics Debate Slides.pdf', 'She in Stem Presentation.pdf'],
        mentorship: ['Public Speaking.pdf'],
        newsletter: ['Comicbook_start.pdf'],
        technical: {
            common: ['Data Science & AI-Ghiwa.pdf', 'Integ.pdf', 'Space Overview.pdf'],
            beginner: ['_Scratch FINAL PPT.pdf', 'GAME DEV.pdf'],
            advanced: ['DAY 2.pdf', 'code (1).ipynb', 'Space Mission Data.csv']
        }
    };

    function displayMaterials(team) {
        materialContainer.innerHTML = '';
        let selectedMaterials = [];

        if (team === 'technical') {
            selectedMaterials = Object.entries(materials.technical).map(([subTeam, files]) => {
                return files.map(file => {
                    return generateMaterialItemHTML(`Material/technical/${subTeam}/${file}`, `${subTeam.toUpperCase()} - ${file}`);
                }).join('');
            }).flat();
        } else if (team === 'all') {
            selectedMaterials = Object.entries(materials).map(([teamName, files]) => {
                if (teamName !== 'technical') {
                    return files.map(file => {
                        return generateMaterialItemHTML(`Material/${teamName}/${file}`, `${teamName.toUpperCase()} - ${file}`);
                    }).join('');
                } else {
                    return Object.entries(files).map(([subTeam, subFiles]) => {
                        return subFiles.map(file => {
                            return generateMaterialItemHTML(`Material/${teamName}/${subTeam}/${file}`, `${teamName.toUpperCase()} (${subTeam}) - ${file}`);
                        }).join('');
                    }).flat();
                }
            }).flat();
        } else {
            selectedMaterials = materials[team].map(file => {
                return generateMaterialItemHTML(`Material/${team}/${file}`, `${team.toUpperCase()} - ${file}`);
            });
        }

        materialContainer.innerHTML = selectedMaterials.join('');
    }

    function generateMaterialItemHTML(filePath, title) {
        let previewContent = '';

        if (filePath.endsWith('.pdf')) {
            previewContent = `<iframe src="${filePath}" frameborder="0"></iframe>`;
        } else if (filePath.endsWith('.csv') || filePath.endsWith('.ipynb')) {
            fetch(filePath)
                .then(response => response.text())
                .then(data => {
                    previewContent = `<pre>${data}</pre>`;
                })
                .catch(error => {
                    previewContent = `<p>Error loading file.</p>`;
                });
        } else {
            previewContent = `<p>Preview not available for this file type.</p>`;
        }

        return `<div class="material-item">
                    <h3>${title}</h3>
                    ${previewContent}
                    <a href="${filePath}" download class="download-button">Download</a>
                </div>`;
    }

    teamFilter.addEventListener('change', (e) => {
        displayMaterials(e.target.value);
    });

    displayMaterials('all');
});
