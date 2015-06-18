myTextPlaceholder = function () {

	return this.each(function(){

		var that = this;

		if (that.placeholder && 'placeholder' in document.createElement(that.tagName))
            return;

		var placeholder = that.getAttribute('placeholder');
		var input = jQuery(that);

		if (that.value === '' || that.value == placeholder) {
			input.addClass('text-placeholder');
			that.value = placeholder;
		}

		input.focus(function(){
			if (input.hasClass('text-placeholder')) {
				this.value = '';
				input.removeClass('text-placeholder')
			}
		});

		input.blur(function(){
			if (this.value === '') {
				input.addClass('text-placeholder');
				this.value = placeholder;
			} else {
				input.removeClass('text-placeholder');
			}
		});

		that.form && jQuery(that.form).submit(function(){
			if (input.hasClass('text-placeholder')) {
				that.value = '';
			}
		});

	});
};


$.editable.addInputType('ptext', {
    element : function(settings, original)
    {
        var input = $('<input type="text"/>');
        if (settings.width  != 'none') { input.attr('width', settings.width);  }
        if (settings.height != 'none') { input.attr('height', settings.height); }
        input.attr('autocomplete','off');
        input.attr('placeholder', settings.placeholder);
        $(this).append(input);
	input.textPlaceholder = myTextPlaceholder;
        input.textPlaceholder();
        return input;
    }
});
