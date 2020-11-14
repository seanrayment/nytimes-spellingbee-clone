$(document).ready(function () {
	// $("#obscure-word-form").bind('submit', function (e) {
	// 	console.log('submitting remove obscure word form');
	// 	e.preventDefault();
	// 	let $form = $(this);
	// 	let url = $form.attr('action');
	// 	$form.submit();
	// 	// posting.done(function (data) {
	// 	// 	console.log(data);
	// 	// 	$("#obscure-word-selector").empty();
	// 	// 	populateForm(data);
	// 	// });
	// 	// posting.fail(function (err) {
	// 	// 	console.log(err);
	// 	// });
	// });

	$("#board-generate-form").bind('submit', function (e) {
		e.preventDefault();
		let $form = $(this);
		let url = $form.attr('action');
		let posting = $.post(url);
		$(".create-spinner").toggleClass("hide");
		posting.done(function (data) {
			$(".create-spinner").toggleClass("hide");
			console.log(data);
			populateForm(data);
		});
		posting.fail(function () {
			$(".create-spinner").toggleClass("hide");
			console.log('failed');
		});
		console.log('this form was stopped from submitting');
	});
});

function populateForm(data) {
	let $selector = $("#obscure-word-selector");
	let $form = $("#obscure-word-form");
	let url = "/game/" + data._id + "/remove";
	$form.attr("action", url)
	console.log($form.attr('action'));
	for (let i = 0; i < data.answers.length; i++) {
		const optionItem = document.createElement("option");
		const optionText = document.createTextNode(data.answers[i]);
		optionItem.appendChild(optionText);
		$selector.append(optionItem);
	}
}