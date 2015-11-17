// remove '.md' and put the date in the end 
export function cleanTitle(title) {
	return title.replace(/\.md$/, '')
				.replace(/^(\d{4}-\d{2}-\d{2})-(.+)$/, '$2 - $1');
}

// get title from file name
export function onlyTitle(title) {
	return title.replace(/^\d{4}-\d{2}-\d{2}-(.+?)\.md$/, '$1');
}

// get date from file name
export function onlyPublishDate(title) {
	// return title.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1');
	return /^\d{4}-\d{2}-\d{2}/.exec(title);
}