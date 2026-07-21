const input = document.getElementById('input');
const addBtn = document.querySelector('.btn-add');
const taskList = document.querySelector('.tasks__list');

//styled variables
const label = document.querySelector('label');
const inputContainer = document.querySelector('.todo__container-functional');

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

function initializeNotes(event) {
	let offsetX = 0;
	const userTextInNote = taskList.querySelectorAll('.tasks__list-text');
	userTextInNote.forEach((note) => {
		function beginSliding(e) {
			offsetX = e.clientX - note.getBoundingClientRect().left;
			console.log(offsetX);
			note.onpointermove = slide;
			note.setPointerCapture(e.pointerId);
			console.log(e);
		}

		function stopSliding(e) {
			note.onpointermove = null;
			note.releasePointerCapture(e.pointerId);
		}
		function slide(e) {
			const clientX = e.clientX - offsetX;
			note.style.transform = `translateX(${clientX}px`;
			console.log(e.clientX);
		}

		note.onpointerdown = beginSliding;
		note.onpointerup = stopSliding;
	});
}

/**
 *FOR NEGATIVE X 100 PX FOR POSITIVE 120 PX
 * i recive all userNotes
 * a need to make on all notes addEventListener
 * for drag it on left or right
 * ---
 * also i need to think about drag 'item'
 * now i can drag only text and see the changes
 * but i need to drag the note body and slide it
 * now i need to think about it
 * ---
 * UPD
 * i can recieve a clientX and paste it in the style for transform it
 * also i need to do it smooth for user
 * i need to think how now i can transform my tasks by X
 * ---
 * OKAY I MADE IT SLIDE
 * but the first i need to know more about how drag work in web
 * also i need to make -x and x for complete and delete
 * my error was in one single s that i placed in a wrong place
 * okay i need to receive negative and positive x's and then i can change my classes or delete notes
 * ---
 * need to make my notes slide only on x axis and drag it only on the left or right
 * now i have a problem with one that, that i'm using a drag and it take item and wait
 * till i'm drop it into the drop zone
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
		initializeNotes(userNote);
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
	initializeNotes(userNote);
	console.log(userNote);
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
        <li class="tasks__list-item"  >
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
				<div class="tasks__list-text" isTrusted='true' isPrimary=true pointerId=2 >
					<p class = "tasks__text-paragraph">${note.task}</p>
				</div>
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
