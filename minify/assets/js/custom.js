var input = document.getElementById("input");
var output = document.getElementById("output");

function minify() {
	var inputValue = input.value;
	output.value = inputValue.replace(/\s/g, "");
	return false;
}

function clearText() {
	input.value = "";
	output.value = "";
}

function saveAsFile() {				
	if (!output.value == "") {
			var blob = new Blob([output.value], {type:'text/plain'});

			var fileName = "temp";

			var downloadLink = document.createElement("a");
			downloadLink.download = fileName;
			downloadLink.innerHTML = "Download File";

			if (window.webkitURL != null)  {
				downloadLink.href = window.webkitURL.createObjectURL(blob);

			} else {
				downloadLink.href = window.URL.createObjectURL(blob);
				downloadLink.onclick = destroyClickedElement;
				downloadLink.style.display = "none";
				document.body.appendChild(downloadLink);
			}
			downloadLink.click();
		} 
	}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}