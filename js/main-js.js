function zoom(e) {
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX / zoomer.offsetWidth * 100
    y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

/* Code block for Quantity Controls */
var qtyMin,
    qtyMax,
    qtyField,
    qtyVal;
$('.icon-minus-squared').on('click', function() {
    qtyField = $(this).next('input[type=number]');
    qtyMin = parseInt($(qtyField).attr('min'));
    qtyVal = parseInt($(qtyField).val());
    if (qtyVal > qtyMin) {
        qtyVal--;
        $(qtyField).val(qtyVal);
        $(this).siblings('.icon-plus-squared').removeClass('off');
        if (qtyVal === qtyMin) {
            $(this).addClass('off');
        }
    }


    updatePrice(qtyVal);

});
$('.icon-plus-squared').on('click', function() {
    qtyField = $(this).prev('input[type=number]');
    qtyMax = parseInt($(qtyField).attr('max'));
    qtyVal = parseInt($(qtyField).val());
    if (qtyVal < qtyMax) {
        qtyVal++;
        $(qtyField).val(qtyVal);
        $(this).siblings('.icon-minus-squared').removeClass('off');
        if (qtyVal === qtyMax) {
            $(this).addClass('off');
        }
    }

    updatePrice(qtyVal);

});

function updatePrice(qty){
	var $base_price = 12.90;
	$(".price").html("NZD"+$base_price * qty);
}

//Validate numeric range of number fields (for quantity input
$('input[type=number]').on('blur', function() {
    var $this = $(this);

    if ($this.attr('min').length > 0 && $this.attr('max').length > 0) {
        vQty = parseInt($this.val()),
            vMin = $this.attr('min'),
            vMax = $this.attr('max');
        if (!$.isNumeric(vQty)) {
            $this.val(vMin);
            $('.icon-plus-squared').removeClass('off')
            $('.icon-minus-squared').addClass('off')
        } else if (vQty < vMin) {
            $this.val(vMin);
            $('.icon-plus-squared').removeClass('off')
            $('.icon-minus-squared').addClass('off')
        } else if (vQty > vMax) {
            $this.val(vMax);
            $('.icon-minus-squared').removeClass('off')
            $('.icon-plus-squared').addClass('off')
        } else { return; }
    }
});


$('#cart-form').submit(function(e) {
    e.preventDefault();
    
    var weight = $('input[name="switch-size"]:checked').val();
    var quantity = $('input[name="quantity"]').val();

    $("#info-box").fadeIn('600', function() {
    	$("#info-box").delay(3000).fadeOut(600);
    });
    $(".total-price").html("Total Price : NZD"+ quantity * 12.90);

});