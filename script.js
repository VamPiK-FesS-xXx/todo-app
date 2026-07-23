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
// document.addEventListener('DOMContentLoaded', initializeNotes);

document.addEventListener('DOMContentLoaded', initializeTemplateNotes);
// another branch finnaly

/**
 * ## all bugs
 * ---
 *  - refresh the page mean to delete all notes and render only 2
 *  - code isn't readble for now need to refactor the code
 *  - bug with input
 *  - index on new notes
 */

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
	if (input.value.trim() === '') {
		label.style.color = 'red';
		inputContainer.style.outline = '1px solid red';
		addBtn.style.background = 'red';
		return;
	} else {
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
		renderNote(userNote);
		console.log(notes);
		//need to do the thing where the only new one object render and all keeps on notes
		// initializeTemplateNotes();
		// initializeNotes();
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
	// renderNote(combinedNotes);
	// initializeTemplateNotes();
	// initializeNotes();
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
/**
 *
 * need something like watch to all notes
 *  check the id's of notes and render the last one note all the time
 * also it'll helps for the future with the complete delete
 * and localstorage
 */
function renderNote() {
	notes.map((note, index) => {
		noteTemplate(note, index);
	});
}

renderNote();
