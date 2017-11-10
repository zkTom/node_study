(function(){
	var oClose=document.querySelector(".dialog-headerbtn");
	var oCancel=document.querySelector(".dialog-footer-wrapper .btn-cancel");
	var oOk=document.querySelector(".dialog-footer-wrapper .btn-ok");
	var oDialog=document.querySelector(".dialog-wrapper");
	var oInput=document.querySelector("input[name=username");
	var socket = io.connect('http://localhost:3001');
	oClose.addEventListener("click",close);
	oOk.addEventListener("click",submit);
	function submit(e){
		if (!oInput.value) {
			alert("名字不能为空");
			return;
		}
		// 出发socket
		var data={username:oInput.value};
		window.username=data.username;
		socket.emit("add user", data);
		// 关闭遮罩层
		oDialog.style.display="none";
	}
	function close(e){
		if (!oInput.value) {
			alert("名字不能为空");
			return;
		}
		oDialog.style.display="none";
	}
})()