// JavaScript Document
$(document).ready(function(){
	if($("input[name=phone]").length > 0)
	{
	    $("input[name=phone]").mask("+7 (999) 999-99-99");
	}

	 $('.slct input, .sposob_dostavki input').live('click',function(){
		filtrform($(this).attr('opt'));
	});	 
	
	$('.slct2').live('click',function(){
		var dropBlock = $(this).parent().find('.drop2');
		if( dropBlock.is(':hidden') ) {
			dropBlock.slideDown();
			$(this).addClass('active');
			$('.drop2').find('li').click(function(){
				$('input#select_sel').val($(this).attr('opt'));
				$('.slct2').removeClass('active').html($(this).text());
				dropBlock.slideUp();
			});
			
		} else {
			$(this).removeClass('active');
			dropBlock.slideUp();
		}
		return false;
	});	
	
	$('#table_visible').click(function(eg){
	    eg.preventDefault();
		if ($('.gen2 .radioblock').find('.size_price.active').length<=0) {
			alert('Укажите, пожалуйста, цену.');
		} else if ($('.gen2 .radioblock').find('.size.active').length<=0) {
			alert('Укажите, пожалуйста, размер.');
		} else {
			id = $(this).attr("rel");
			size = $('.gen2 .radioblock').find('.size.active').find('span').html();
			$.getJSON("site_engine/module/basket/ajax_buy.php",
				{f1:$('#bas_add_txt'+id).val(),f2:$('#bas_add_url'+id).val(),f3:$('#select_price'+id).val(),f4:$('#bas_add_col'+id).val(),f5:id,f6:$('#bas_add_adds'+id).val(),f7:size,f8:$('#bas_add_art'+id).val(),f9:$('#bas_add_sizes'+id).val(),f10:$('#bas_add_price1_'+id).val(),f11:$('#bas_add_price2_'+id).val()},
				function(data){
					$('.inbasket').html('('+data.col+')');
					alert('Товар добавлен в корзину!');
				}
			);
			/*$('#formActionBasket').submit();*/
		}
	});
	$('.checkboxes').find('.check').click(function(){
		if( $(this).find('input').is(':checked') ) {
			$(this).removeClass('active');
			$(this).find('input').removeAttr('checked');
		} else {
			$(this).addClass('active');
			$(this).find('input').attr('checked', true);
		}
	});
	
	if ( $('.radioblock.rprice .style_5').length == 0 )
	{
	    $('.radioblock.rprice .radio').parent().removeClass('style_3').addClass('style_5');
		$('.radioblock.rprice .radio').parent().parent().parent().find('.style_4').removeClass('.style_4').addClass('style_6');
	}
	
	$('.radioblock').find('.radio').live('click',function(){
		radio(this);
		if ($(this).parent().parent().parent().parent().parent().parent().parent().hasClass('rprice'))
		{
		    $('.style_5').removeClass('style_5').addClass('style_3');
		    $('.style_6').removeClass('style_6').addClass('style_4');
		    $(this).parent().removeClass('style_3').addClass('style_5');
		    $(this).parent().parent().parent().find('style_4').removeClass('style_4').addClass('style_6');
		}
	});

	$('.gen2 .radioblock').find('.size').live('click',function(){
		radio2(this);
	});
	$('.gen2 .radioblock').find('.size_price').live('click',function(){
		radio3(this);
	});
	if ($('.gen2 .radioblock').find('.size_price.active').length>0) radio3($('.gen2 .radioblock').find('.size_price.active'));

	if($('#slider1').length>0){ $('#slider1').tinycarousel({pager: true}); }
	if($('#slider2').length>0){ $('#slider2').tinycarousel({axis: 'x'}); }
	
	if ($('.form_table.steps').length>0) filtrform();
	
	if($("a[rel^='prettyPhoto']").length>0){
		$("a[rel^='prettyPhoto']").prettyPhoto({social_tools:false, allow_resize: false});
	}
	$('.overview li img').live('click',function(){
				$('.overview li').removeClass('active');
				$(this).parent().addClass('active');
				$('.main_pic img').attr('src',$(this).attr('rel'));
				$('.main_pic').attr('href',$(this).attr('rel'));
			});
			
	$('.product_block').click(function(){
	    document.location.href=$(this).attr('rel');
	});	
	
    $("#back-top").hide();
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    $('#back-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });	
	
	$('.more').click(function(event) {
		event.preventDefault();
		var inp = $(this).prev();
		var v = $(inp).val();
		if (v=='') v=0;
		v = parseInt(v);
		$(inp).val(v+1);
	});
	$('.less').click(function(event) {
		event.preventDefault();
		var inp = $(this).next();
		var v = $(inp).val();
		if (v=='') {
			v=1;
			$(inp).val(v);
		}
		if(v>1) {
			v = parseInt(v);
			$(inp).val(v-1);
		}
	});
	filtrform();
});

function radio(obj){ if(!$(obj).hasClass('disabled')){
	var cls = $(obj).attr('rel');
	var valueRadio = $(obj).next('span').html();
	$('.radioblock.'+cls).find('.radio').removeClass('active');
	$(obj).addClass('active');
	$('.radioblock.'+cls).find('input').val(valueRadio);
}
}
function radio2(obj){ if(!$(obj).hasClass('disabled')){
	var valueRadio = $(obj).find('span').text();
	$('.radioblock').find('.size').removeClass('active');
	$(obj).addClass('active');
	$('.radioblock').find('input').val(valueRadio);
}
}

function radio3(obj){
	if(!$(obj).hasClass('disabled')){
		if ($(obj).hasClass('size_price')) {
			var rel=$(obj).attr('rel');
			var price=$(obj).find('input').attr('rel');
			price = price.replace(' ', '');
			$('#select_price'+rel).attr('value', price);
		}
		var valueRadio = $(obj).find('span').text();
		$('.radioblock').find('.size_price').parent().removeClass('style_5').addClass('style_3');
		$('.radioblock').find('.size_price').parent().next().removeClass('style_6').addClass('style_4');
		$(obj).parent().addClass('style_5').removeClass('style_3');
		$(obj).parent().next().addClass('style_6').removeClass('style_4');
		$('.radioblock').find('input').val(valueRadio);
	}
}
function filtrform(step){
	if(step==''||step==null) {step = '2c';}
	$('.steps tr').each(function(index, element) {
			var rel = $(element).attr('rel');
if (index != 25)
{		
		if(strpos(rel,step)!==false){ $(element).css('display','table-row');  }
			else {$(element).css('display','none');}
}
	});
	var step_name = $('.drop [opt="'+step+'"]').html();
	$('#select').val(step_name);
	$('a.slct').html(step_name);
}
function strpos( haystack, needle, offset){ 
    var i = haystack.indexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}

function vfFeedBack() 
{
    var error = '';
    if (document.fFeedBack.fGuest_Name.value == "") 
    { 
	    error += 'Не заполнено поле "Имя"\n';
	}
    if (document.fFeedBack.fGuest_Email.value == "") 
    { 
	    error += 'Не заполнено поле "E-mail"\n';
	}	
    if (!isValidEmailAddress(document.fFeedBack.fGuest_Email.value) && document.fFeedBack.fGuest_Email.value != '') 
    { 
	    error += 'Введен некорректный email-адрес\n';
	}	
    if (document.fFeedBack.fGuest_Razdel.value == "" || document.fFeedBack.fGuest_Razdel.value == "0") 
    { 
	    error += 'Не выбран "Раздел"\n';
	}	
    if (document.fFeedBack.fGuest_Msg.value == "") 
    { 
	    error += 'Не заполнено поле "Написать вопрос"\n';
	}	

    if (error != '')
    {
	    alert(error);
	    event.returnValue = false; 
		return false; 
    }	
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$(function(){

	function marginPopup(info){
	    var heightWindow = $(window).height();
	    var heightPopup = info.outerHeight();
	    var mPopup = (heightWindow-heightPopup)/2;
	    if (heightPopup<heightWindow){
	        info.css('top', mPopup);
	    }
	    else{
	        info.css('top', '50px');
	    }
	}

    var body = $('body');
    var close_modal = $('.close-popup');
    var modal_container = $('.popup-overlay');
    var infoPopup = $('.popup-info');

    
    var getModal = function(e) {
    e.preventDefault();
        $('body,html').css('overflow-y','hidden');
        $('.container').css('overflow-y', 'scroll');
        modal_container.show().addClass('loader-popup');
        urlLink = $(this).attr('href');
        $.get(urlLink, function(data){
            modal_container.removeClass('loader-popup');
            $('.popup-custom').html(data);
            marginPopup(infoPopup);
            infoPopup.show();
        });
        return false;
    };



    body.on('click', '#table_sizes', getModal);
    close_modal.on('click', function(){
        modal_container.hide();
        infoPopup.hide();
        $('body,html').css('overflow-y','auto');
        $('.container').css('overflow-y', 'auto');
        if ( $(".profile")[0] ) {
            $("html").css("overflow-y", "visible");
        }
        return false;
    });

    modal_container.click( function(event){
        if( $(event.target).closest(infoPopup).length ) return;
        modal_container.hide();
        infoPopup.hide();
        $('body,html').css('overflow-y','auto');
        $('.container').css('overflow-y', 'auto');
        event.stopPropagation();
    });
    infoPopup.click( function(event){
        event.stopPropagation();
    });
});