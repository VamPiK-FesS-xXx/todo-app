const input = document.getElementById('input');
const addBtn = document.querySelector('.btn-add');
const taskList = document.querySelector('.tasks__list');

//styled variables
const label = document.querySelector('label');
const inputContainer = document.querySelector('.todo__container-functional');
//object for notes will init with this obj

//comments

/**
 *
 * fix bug with input display error
 * think about objects
 * think about template render
 * later
 * ---
 * also think about controls on tasks
 * ---
 * make a slide effect or drag and drop
 * make a notification and animation that user can slide
 * his notes
 * ---
 * save all notes in localstroge and render they
 */
const notes = [
	{
		task: '123',
		status: false,
	},
	{
		task: '123',
		status: true,
	},
];

/**
 * think about make one more object in object
 * make variable newNote into notes to try to save data
 * from input value and then push it into template
 *
 */

input.addEventListener('keydown', () => {
	//fix the bag with empty input later
	if (input.value.trim() === '') {
		label.style.color = 'red';
		inputContainer.style.outline = '1px solid red';
		addBtn.style.background = 'red';
		return;
	} else if (event.key === 'Enter') {
		const userNote = {
			task: input.value,
			status: false,
		};

		notes.push(userNote);
		noteTemplate(userNote);
		input.value = '';
	}
});

addBtn.addEventListener('click', () => {
	if (input.value.trim() === '') {
		label.style.color = 'red';
		inputContainer.style.outline = '1px solid red';
		addBtn.style.background = 'red';
		return;
	}
	const userNote = {
		task: input.value,
		status: false,
	};

	notes.push(userNote);
	noteTemplate(userNote);
	input.value = '';
});

//template fucntion for tasks
/**
 * check the status from the class
 * if status true classname will change to 'complete'
 */
function noteTemplate(note) {
	taskList.insertAdjacentHTML(
		'beforeend',
		`
        <li class="tasks__list-item ${note.status ? '' : 'complete'}">
		<p class="tasks__list-text">${note.task}</p>
        </li>
        `,
	);
}

//render fucntion which sort through notes object
function renderNote() {
	notes.forEach((note) => {
		noteTemplate(note);
	});
}
renderNote();
