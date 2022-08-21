// require all the needed files
const fs = require('fs'); 
const inquirer = require('inquirer');
const generateHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const teamArray = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'getName',
            message: "Please enter manager's name", 
            
        },
        {
            type: 'input',
            name: 'getId',
            message: "Please enter the manager's ID.",
        },
        {
            type: 'input',
            name: 'getEmail',
            message: "Please enter the manager's email.",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
        }
    ])
    .then(managerInput => {
        const  {getName, getId, getEmail, officeNumber } = managerInput; 
        const manager = new Manager (getName, getId, getEmail, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log();

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'getRole',
            message: "Please choose your employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'getName',
            message: "What's the name of the employee?", 
        },
        {
            type: 'input',
            name: 'getId',
            message: "Please enter the employee's ID.",
        },
        {
            type: 'input',
            name: 'getEmail',
            message: "Please enter the employee's email.",
        },
        {
            type: 'input',
            name: 'getGithub',
            message: "Please enter the employee's github username.",
            when: (input) => input.getRole === "Engineer",
        },
        {
            type: 'input',
            name: 'getSchool',
            message: "Please enter the intern's school",
            when: (input) => input.getRole === "Intern",
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let { getName, getId, getEmail, getRole, getGithub, getSchool, confirmAddEmployee } = employeeData; 
        let employee; 

        if (getRole === "Engineer") {
            employee = new Engineer (getName, getId, getEmail, getGithub);

            console.log(employee);

        } else if (getRole === "Intern") {
            employee = new Intern (getName, getId, getEmail, getSchool);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};

const writeFile = data => {
    fs.writeFile('./assets/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });