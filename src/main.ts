export {}

import { setupButtonForAssignment1 } from './assignment1.js'
import { setupButtonForAssignment2 } from './assignment2.js'
import { setupButtonForAssignment3 } from './assignment3.js'
import { setupButtonForAssignment4 } from './assignment4.js'

const divToPutContent: HTMLDivElement = <HTMLDivElement> document.getElementById('divToPutContent');

const buttonForAssignment1: HTMLButtonElement = <HTMLButtonElement> document.getElementById('buttonForAssignment1');
const buttonForAssignment2: HTMLButtonElement = <HTMLButtonElement> document.getElementById('buttonForAssignment2');
const buttonForAssignment3: HTMLButtonElement = <HTMLButtonElement> document.getElementById('buttonForAssignment3');
const buttonForAssignment4: HTMLButtonElement = <HTMLButtonElement> document.getElementById('buttonForAssignment4');

const buttons: HTMLButtonElement[] = [buttonForAssignment1, buttonForAssignment2, buttonForAssignment3, buttonForAssignment4];

setupButtonForAssignment1(buttons, divToPutContent);

setupButtonForAssignment2(buttons, divToPutContent);

setupButtonForAssignment3(buttons, divToPutContent);

setupButtonForAssignment4(buttons, divToPutContent);