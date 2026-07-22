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
		task: '456',
		status: true,
	},
];
document.addEventListener('DOMContentLoaded', initializeNotes);

document.addEventListener('DOMContentLoaded', initializeTemplateNotes);
// another branch finnaly

/**
 * ### functionality
 * ---
 *  - find the mark where slide can be stopped
 *  - change class by index if complete
 *  - delete for notes by index
 *  - make functional if user click on the task then will appear controls
 *
 * ---
 * also think about changing classes of tasks
 */

function initializeNotes() {
	const savedUserNotes = [...notes];
	console.log(savedUserNotes);
	const savedNotes = localStorage.setItem(
		'saved-data',
		JSON.stringify(savedUserNotes),
	);

	const savedData = JSON.parse(localStorage.getItem('saved-data'));
	console.log(savedData);
	savedData.forEach((savedDataNote) => {
		noteTemplate(savedDataNote);
	});
	// noteTemplate(savedData);
}

function initializeTemplateNotes() {
	const userTextInNote = taskList.querySelectorAll('.tasks__list-text');
	userTextInNote.forEach((note) => {
		let offsetX = 0;
		let initialLeft = 0;
		let currentDelta = 0;
		let THRESHOLD = 150;
		function beginSliding(e) {
			e.preventDefault();
			const rect = note.getBoundingClientRect();
			initialLeft = rect.left;
			offsetX = e.clientX - initialLeft;
			note.onpointermove = slide;
			note.setPointerCapture(e.pointerId);
		}

		function stopSliding(e) {
			e.preventDefault();
			note.onpointermove = null;
			note.releasePointerCapture(e.pointerId);
		}
		function slide(e) {
			e.preventDefault();
			const desiredLeft = e.clientX - offsetX;
			const deltaX = desiredLeft - initialLeft;
			if (Math.abs(deltaX) > THRESHOLD) {
				note.style.transform = 'translateX(0px)';
				return;
			}
			note.style.transform = `translateX(${deltaX}px)`;
		}

		note.onpointerdown = beginSliding;
		note.onpointerup = stopSliding;
	});
}
/**
 * #bugs
 * ---
 * - fix input catch error
 */
input.addEventListener('keydown', () => {
	//fix the bag with empty input later
	if (input.value.trim().length === 0) {
		label.style.color = 'red';
		inputContainer.style.outline = '1px solid red';
		addBtn.style.background = 'red';
		return;
	} else if (input.value.trim().length > 0) {
		label.style.color = '#fff';
		inputContainer.style.outline = '1px solid #fff';
		addBtn.style.background = '#124559';
	}
	if (event.key === 'Enter') {
		const userNote = {
			task: input.value,
			status: false,
		};
		notes.push(userNote);
		noteTemplate(userNote);
		initializeTemplateNotes();
		initializeNotes();
		input.value = '';
	}
});
/**
 * #bugs
 * ---
 * - fix input catch error
 */
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
	initializeTemplateNotes();
	initializeNotes();
	input.value = '';
});

//template fucntion for tasks

function noteTemplate(note, index) {
	taskList.insertAdjacentHTML(
		'beforeend',
		`
        <li class="tasks__list-item" data-index = ${index}>
			<div class="tasks__list-bg">
				<span class="tasks__bg bg-green">
                    <i class="fa-solid fa-check"></i>
                        complete
                </span>
				<span class="tasks__bg bg-red">
                    delete
                        <i class="fa-solid fa-trash"></i>
                </span>
			</div>
				<div class="tasks__list-text" isTrusted='true' >
					<p class = "tasks__text-paragraph">${note.task}</p>
				</div>
		</li>
        `,
	);
}
//render fucntion which sort through notes object

function renderNote() {
	notes.forEach((note, index) => {
		noteTemplate(note, index);
	});
}

// renderNote();
