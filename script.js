const input = document.getElementById('input');
const addBtn = document.querySelector('.btn-add');
const taskList = document.querySelector('.tasks__list');

//styled variables
const label = document.querySelector('label');
const inputContainer = document.querySelector('.todo__container-functional');
//object for notes will init with this obj

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
