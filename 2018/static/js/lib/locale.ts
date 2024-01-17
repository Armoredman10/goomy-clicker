var locale = "en-CA";

if (navigator.languages && navigator.languages.length) {
	locale = navigator.languages[0];
} else {
	locale = navigator.language;
}

locale = "en-CA";

export default locale;



// WEBPACK FOOTER //
// ./src/lib/locale.ts