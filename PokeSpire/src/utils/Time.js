export function calculateDate() {
	let Dat = new Date();
	let calcHr;
	let calcMin;
	if (Dat.getHours() < 10) {
		calcHr = `0${Dat.getHours().toString()}`;
	} else {
		calcHr = `${Dat.getHours().toString()}`;
	}
	if (Dat.getMinutes() < 10) {
		console.log(`min == ${Dat.getMinutes}`);
		calcMin = `0${Dat.getMinutes().toString()}`;
	} else {
		calcMin = `${Dat.getMinutes().toString()}`;
	}
	let calcDat = `${calcHr}${calcMin}`;
	let time = `${Dat.getDate()} • ${Dat.getMonth() + 1} • ${Dat.getFullYear()}`;
	return time;
    
}
