window.addEventListener('load', () => {
	document.querySelector('.Button').addEventListener('click', e => {
		const lowBound = document.querySelector('#LowBound').value;
		const highBound = document.querySelector('#HighBound').value;
		const maxIter = document.querySelector('#MaxIter').value;
		
		// weed out bad parameters
		if (lowBound < 1 || highBound < 1 || maxIter < 1) {
			alert('Please enter a whole number.');
			return;
		}

		const existing = document.querySelector('table');
		if (existing) {
			existing.remove();
		}

		const table = document.createElement('table');
		document.body.insertBefore(table, document.querySelector('.FooterBar'));
		const header = document.createElement('tr');
		header.innerHTML = `
			<th></th>
			<th>Number</th>
			<th>Result</th>
			<th>Iteration Count</th>
		`;
		table.appendChild(header);

		document.querySelector('.Note').classList.remove('is-hidden');

		for (let i = lowBound; i <= highBound; i++) {
			let numStr = i.toString();
			let backwards = numStr.split('').reverse().join('');

			let palindrome = false;
			let yield = 0;
			let iterCount = 0;
			let overflow = false;

			for (let j = 0; j <= maxIter; j++) {
				iterCount = j;
				if (numStr === backwards) {
					palindrome = true;
					yield = parseInt(numStr);
					break;
				} else {
					numStr = (parseInt(numStr) + parseInt(backwards)).toString();
					if (parseInt(numStr) < i) {
						overflow = true;
						break;
					}
					yield = parseInt(numStr);
					backwards = numStr.split('').reverse().join('');
				}
			}

			const resultEl = document.createElement('tr');
			if (!palindrome) {
				resultEl.classList.add('RowPalindromeFalse');
			}
			const resultBox = document.createElement('div');
			resultBox.classList.add('ResultBox');
			resultBox.classList.add(palindrome ? 'PalindromeTrue' : 'PalindromeFalse');
			// resultEl.appendChild(resultBox);
			const resultTd1 = document.createElement('td');
			resultTd1.appendChild(resultBox);
			resultEl.appendChild(resultTd1);
			const resultTd2 = document.createElement('td');
			resultTd2.innerHTML = i;
			resultEl.appendChild(resultTd2);
			const resultTd3 = document.createElement('td');
			resultTd3.innerHTML = overflow ? '<a href="https://en.wikipedia.org/wiki/Integer_overflow">Number Too Large</a>' : yield;
			resultEl.appendChild(resultTd3);
			const resultTd4 = document.createElement('td');
			resultTd4.innerHTML = iterCount;
			resultEl.appendChild(resultTd4);

			table.appendChild(resultEl);
		}
	});
});