#! /usr/bin/env node
import inquirer from "inquirer";

// Represents a Student with an ID, name, courses, and balance.
class Student {
    static counter = 10000 //static counter to generate unique IDs
    id: number;
    name: string;
    courses: string[];
    balance: number;

    //  Constructor to create a new Student instance.
    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }

    //  Enrolls the student in a course.

    enroll_courses(course: string) {
        this.courses.push(course);
    }
    // view students balance 
    view_blance() {
        console.log(`${this.name} your balance is: $${this.balance}`);
    }
    //  pay students fees
    pay_fees(amount: number) {
        this.balance -= amount;
        console.log(`$${amount} fees paid succesfully for ${this.name} `)
        console.log(`${this.name} your remaining balance is $${this.balance}`);
    }
    //  show statuse about student
    show_student() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }

}
// Defining a class to manage students

class StudentManager {
    students: Student[]

    constructor() {
        this.students = [];
    }
    // 1: Methods to add a student
    add_student(name: string) {
        let student = new Student(name)
        this.students.push(student);
        console.log(`Student ${name} added succesfully. student ID: ${student.id}`);
    }
    // 2: method to enroll a student in course
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id)
        if (student) {
            student.enroll_courses(course);
            console.log(`Student ${student.name} enrolled in ${course} succesfully.`);
        }
    }
    // 3: method to view a students balance
    view_student_blance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_blance()
        }
        else {
            console.log("Student not found")
        }
    }
    // 4: methode to pay fees
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, enter a correct ID")
        }
    }
    // 5: method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_student();
        }
    }
    //  6: method to find student by student ID
    find_student(student_id: number) {
        return this.students.find(s => s.id === student_id);
    }
}
//  Main fuction to run the program
async function main() {
    console.log("welcome to madiha khan's student management system")
    console.log("-".repeat(50))

    let sM = new StudentManager();

    // while loop to keep program running

    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "pay fees",
                    "show status",
                    "Exit"
                ]
            }
        ]);

        // using switch case to handle user choice

        switch (choice.choices) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name"
                    }
                ]);
                sM.add_student(name_input.name);
                break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student-id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name"
                    }
                ]);
                sM.enroll_student(course_input["student-id"], course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student-id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                sM.view_student_blance(balance_input["student-id"]);
                break;
            case "pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student-id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                sM.pay_student_fees(fees_input["student-id"], fees_input.amount);
                break;

            case "show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student-id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                sM.show_student_status(status_input["student-id"])
                break;
            case "Exit":
                console.log("Exiting the program");
                process.exit();

        }
    }
}

// calling a main function 
main();


