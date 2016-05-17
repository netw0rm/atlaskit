import add from './add';

//transform an ordinary button into a sean-button
export default function(){
	var theButton = document.createElement('span');

	theButton.classList.add('sean-button');
	theButton.innerHTML = `1 + 4 = ${add(1, 4)}`;

	return theButton;
}

export function subtract(a, b){
	return a - b;
}
