const api_key = 'WRdtv0OEm7hVJbtspdFtnooenCKq3rG4QlQifCLE'
let img_index = 0
let images = []

$('#find').click(function () {
    $('#this-all').css('display', 'none')
    $('#result-img').html('<div class="d-flex justify-content-center">\n' +
        '<div class="spinner-border m-5" id="spinner">\n' +
        '<span class="visually-hidden"> </span>\n' +
        '</div>\n' +
        '</div>')

    $('#right').css('visibility', 'hidden')
    $('#left').css('visibility', 'hidden')
    img_index = 0
    images = []
    let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=' + api_key;
    const dateInput = $('#date')
    const cameraInput = $('#camera')

    if (dateInput.val()) {
        console.log('date',parseInt(dateInput.val().slice(8, 10)) )

        url += '&earth_date=' + dateInput.val().slice(0, 4) + '-'
            + parseInt(dateInput.val().slice(5, 7)) + '-'
            + parseInt(dateInput.val().slice(8, 10))
    }
    if (cameraInput.val() !== 'Все') {
        console.log('camera', cameraInput.val())
        url += '&camera=' + cameraInput.val()
    }

    console.log(url)
    $.ajax({
        url: url,
    }).done(function(result) {
        $('#find').blur()
        if (result['photos'].length > 0) {
            let i = 0;
            $('#result-img').html('')
            for (let photo_number in result['photos']) {
                $('#result-img').append('<img src="' + result['photos'][photo_number]['img_src'] + '">')
                images.push($('#result-img img:last'))
            }
            images[0].fadeIn(100, function () {
                if (images.length > 1) {
                    $('#right').css('visibility', 'visible')
                    $('#this-all').css('display', 'inline-block')
                    $('#this-all #this-img').text(img_index+1)
                    $('#this-all #all-img').text(images.length)
                }
            })
        } else {
            $('#result-img').html('<p class="fw-light">Снимков с такими параметрами нет</p>')
        }
    });
})

$('#right').click(function () {

    if (img_index + 1 <= images.length - 1) {
        images[img_index].css('display', 'none')
        img_index++
        $('#this-all #this-img').text(img_index+1)
        images[img_index].css('display', 'inline-block')
        if (img_index >= images.length - 1) {
            $('#right').css('visibility', 'hidden')
        }
        if (img_index > 0) {
            $('#left').css('visibility', 'visible')
        }
    }

})

$('#left').click(function () {

    if (img_index - 1 >= 0) {
        images[img_index].css('display', 'none')
        img_index--
        $('#this-all #this-img').text(img_index+1)
        images[img_index].css('display', 'inline-block')
        if (img_index === 0) {
            $('#left').css('visibility', 'hidden')
        }
        if (img_index < images.length - 1) {
            $('#right').css('visibility', 'visible')
        }
    }
})