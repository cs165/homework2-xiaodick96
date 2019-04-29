// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

function assignChecked(check) {
	const qID = '[data-question-id="'+check.dataset.questionId+'"]';
	const qbox = document.querySelectorAll(qID);
	for(const box of qbox) {
		box.children[1].src = IMG_UNCHECKED;
		box.classList.remove('checked');
		box.classList.add('unchecked');
	}
	check.classList.replace('unchecked', 'checked');
	check.children[1].src = IMG_CHECKED;
	if(check.dataset.questionId==='one') {
		takenQ[0]=check.dataset.choiceId;
	}else if(check.dataset.questionId==='two') {
		takenQ[1]=check.dataset.choiceId;
	}else if(check.dataset.questionId==='three') {
		takenQ[2]=check.dataset.choiceId;
	}
}

function isAllChecked() {
	if(takenQ[0] !== undefined && takenQ[1] !== undefined && takenQ[2] !== undefined) {
		if(takenQ[1] === takenQ[2]) {
			return takenQ[1];
		}else {
			return takenQ[0];
		}
	}
	return null;
}

function restartQuiz() {
	const a = document.querySelector('article');
	a.lastChild.children[2].removeEventListener('click', restartQuiz);
	for(let i=0; i<3; i++) {/* restart the quiz*/
		a.lastChild.removeChild(a.lastChild.children[0]);
		delete takenQ[i];
	}
	a.removeChild(a.lastChild);
	for(const box of boxes) {/* reset 参数 */
		box.children[1].src = IMG_UNCHECKED;
		box.classList.remove('unchecked');
		box.classList.remove('checked');
		box.addEventListener('click', changeToChecked);
	}
	document.getElementById('author').scrollIntoView();
}

function displayResult(ans) {
	const articleContainer = document.querySelector('article');
	const rSection = document.createElement('section');
	rSection.classList.add('ans');
	articleContainer.appendChild(rSection);
	const resultContainer = document.querySelector('.ans');

	const header = document.createElement('h1');
		header.textContent = 'You got: ' + RESULTS_MAP[ans].title;

	const content = document.createElement('p');
		content.textContent = RESULTS_MAP[ans].contents;
	
	const resultButton = document.createElement('button');
	resultButton.textContent = 'Restart quiz';
	resultButton.addEventListener('click', restartQuiz);
	
	resultContainer.appendChild(header);
	resultContainer.appendChild(content);
	resultContainer.appendChild(resultButton);
}

function changeToChecked(event) {
	assignChecked(event.currentTarget);

	const ans = isAllChecked();
	if(ans) {
		for(const box of boxes) {
			box.removeEventListener('click', changeToChecked);
		}
		displayResult(ans);
	}
}

const IMG_UNCHECKED = 'images/unchecked.png';
const IMG_CHECKED = 'images/checked.png';

const takenQ = {};

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes) {
	box.addEventListener('click', changeToChecked);
}