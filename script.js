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
		task: '456',
		status: true,
	},
];

/**
 * think about make one more object in object
 * make variable newNote into notes to try to save data
 * from input value and then push it into template
 *
 */
document.addEventListener('DOMContentLoaded', initializeNotes);

function initializeNotes() {
	const userTextInNote = taskList.querySelectorAll('.tasks__list-text');
	userTextInNote.forEach((note) => {
		// note.addEventListener('pointerdown', (event) => {
		// 	const positiveLayerX = event.layerX; // add a minus in begin if need a negative transform
		// 	console.log(positiveLayerX);
		// 	note.style.transform = `translateX(${positiveLayerX}px`;
		// });
		// note.addEventListener('pointermove', (e) => {
		// 	console.log(e.target);
		// 	if (e.target) {
		// 		note.addEventListener('pointerdown', () => {
		// 			const positiveLayerX = e.layerX; // add a minus in begin if need a negative transform
		// 			console.log(positiveLayerX);
		// 			note.style.transform = `translateX(${positiveLayerX}px`;
		// 		});
		// 	}
		// });

		note.addEventListener('pointerup', (e) => {
			// console.log(e.target);
			e.preventDefault();
			if (e.target) {
				note.addEventListener('pointermove', (e) => {
					e.preventDefault();

					const positiveLayerX = e.layerX; // add a minus in begin if need a negative transform
					note.style.transform = `translateX(${parseInt(positiveLayerX / 25)}%`;
					console.log(parseInt(positiveLayerX / 5));
				});
			}
		});
	});

	function slideNote(note) {}
	// userTextInNote.forEach((note, index) => {
	// 	note.addEventListener('poi', (e) => {
	// 		const positiveClientX = e.clientX;
	// 		const negativeClientX = -e.clientX;
	// 		userTextInNote.style.transform = `translateX(${negativeClientX}px`;
	// 		if (negativeClientX >= -25) {
	// 			console.log('delete note');
	// 		}
	// 	});
	// });
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
}
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
/**
 * need to make bg green and red with text in bgs
 * find x in client and if x = 60 task change classname
 * else if x = ??? task delete from array
 * bg maybe can make with before after
 */
function renderNote() {
	notes.forEach((note) => {
		noteTemplate(note);
		initializeNotes(note);
	});
}

renderNote();

/**
 *
 * new comments
 */
