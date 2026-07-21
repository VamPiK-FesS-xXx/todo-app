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

function renderNote() {
	notes.forEach((note) => {
		noteTemplate(note);
	});
}

renderNote();
