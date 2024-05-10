const N = 10;
        let employees = [];

        const generatePerson = () => {
            const name = {
                firstName: getRandomLetter('A', 'Z'),
                lastName: getRandomLetter('A', 'Z')
            };

            const birthdate = {
                day: Math.floor(Math.random() * 28) + 1,
                month: Math.floor(Math.random() * 12) + 1,
                year: Math.floor(Math.random() * 50) + 1970
            };

            const phone_number = Math.floor(Math.random() * 9000000000) + 1000000000;

            const job = {
                organization: `OOO ${getRandomLetter('A', 'Z')}${getRandomLetter('A', 'Z')}${getRandomLetter('A', 'Z')}`,
                position: getRandomLetter('A', 'Z'),
                experience: Math.floor(Math.random() * 10) + 1
            };

            return {
                name,
                birthdate,
                phone_number,
                job
            };
        };

        function generateEmployees() {
            employees = Array.from({ length: N }, generatePerson);
            console.log('Сотрудники сгенерированы:', employees);
            renderIntermediateResults(employees);
            renderEmployees(employees);
        }

        function searchEmployees(criteria) {
            const { organization, position, experience, birthdate } = criteria;
            const filteredEmployees = employees.filter(emp => {
                if (organization && emp.job.organization !== organization) {
                    return false;
                }

                if (position && emp.job.position !== position) {
                    return false;
                }

                if (experience && (emp.job.experience < experience[0] || emp.job.experience > experience[1])) {
                    return false;
                }

                if (birthdate && (new Date(emp.birthdate.year, emp.birthdate.month - 1, emp.birthdate.day) > new Date(birthdate) || new Date(emp.birthdate.year, emp.birthdate.month - 1, emp.birthdate.day) < new Date(birthdate))) {
                    return false;
                }

                return true;
            });

            console.log('Сотрудники после поиска:', filteredEmployees);
            renderIntermediateResults(filteredEmployees);
            renderEmployees(filteredEmployees);
        }

        function removeBirthdateIfExperienceBelow(threshold) {
            employees.forEach((emp) => {
                if (emp.job.experience < threshold) {
                    delete emp.birthdate;
                }
            });
            console.log('Сотрудники после удаления дат рождения:', employees);
            renderIntermediateResults(employees);
            renderEmployees(employees);
        }

        function addLocationInfo() {
            const locationNames = {
                '1': 'Бостон',
                '2': 'Оттава',
                '3': 'Перу',
                '4': 'Мяу',
                '5': 'Что-то интересное',
                '6': 'Баку',
                '7': 'Москва (Центральный)',
                '9': 'Санкт-Петербург',
            };
            employees.forEach((emp) => {
                const location = String(emp.phone_number).slice(0, 1);
                const locationName = locationNames[location] || `Другое место (${location[0]}*)`;
                emp.location = `${locationName}`;
            });
            console.log('Сотрудники после добавления информации о местоположении:', employees);
            renderIntermediateResults(employees);
            renderEmployees(employees);
        }

        function getRandomLetter(min, max) {
            const startIndex = min.charCodeAt(0);
            const endIndex = max.charCodeAt(0);
            const randomIndex =
                Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
            return String.fromCharCode(randomIndex);
        }

        function renderIntermediateResults(employees) {
            const intermediateResultsElement = document.getElementById('intermediate-results');
            intermediateResultsElement.textContent = JSON.stringify(employees, null, 2);
        }