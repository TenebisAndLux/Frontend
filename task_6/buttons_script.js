document.getElementById('generate-employees-button').onclick = generateEmployees;
        document.getElementById('sort-employees-button').onclick = () => renderEmployees(employees.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName)));
        document.getElementById('search-employees-button').onclick = () => {
            const organizationInput = prompt('Введите название организации или не вводите для поиска по всем');
            const positionInput = prompt('Введите должность или не вводите для поиска по всем');
            const experienceInput = prompt('Введите диапазон стажа через запятую или не вводите для поиска по всем');
            const birthdateInput = prompt('Введите дату в формате ГГГГ-ММ-ДД');

            const criteria = {
                organization: organizationInput || undefined,
                position: positionInput || undefined,
                experience: experienceInput ? experienceInput.split(',').map(Number) : undefined,
                birthdate: birthdateInput ? new Date(birthdateInput) : undefined
            };

            searchEmployees(criteria);
        };
        document.getElementById('remove-birthdate-if-experience-below-button').onclick = () => {
            const thresholdInput = prompt('Введите стаж');

            const threshold = Number(thresholdInput);

            removeBirthdateIfExperienceBelow(threshold);
        };
        document.getElementById('add-location-info-button').onclick = addLocationInfo;
        document.getElementById('return-button').onclick = () => renderEmployees(employees);

        document.getElementById('save-button').onclick = () => {
            const serializedEmployees = JSON.stringify(employees);

            const blob = new Blob([serializedEmployees], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'employees.json';
            a.click();

            document.getElementById('intermediate-results').textContent = serializedEmployees;
        };
        document.getElementById('load-button').onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = () => {
                const file = input.files[0];

                const reader = new FileReader();
                reader.onload = () => {
                    const serializedEmployees = reader.result;

                    employees = JSON.parse(serializedEmployees);
                    renderEmployees(employees);
                };
                reader.readAsText(file);
            };
            input.click();
        };