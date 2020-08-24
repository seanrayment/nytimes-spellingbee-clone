$(document).ready(function () {
	$("#board-generate-form").bind('submit', function (e) {
		e.preventDefault();
		var $form = $(this);
		var url = $form.attr('action');
		var posting = $.post(url);
		$(".create-spinner").toggleClass("hide");
		posting.done(function (data) {
			$(".create-spinner").toggleClass("hide");
			console.log(data);
		});
		posting.fail(function () {
			$(".create-spinner").toggleClass("hide");
			console.log('failed');
		});
		console.log('this form was stopped from submitting');
	});
});

