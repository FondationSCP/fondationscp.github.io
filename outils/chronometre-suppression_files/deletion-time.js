function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var text = '';
    text += date.getFullYear();
    text += '-';
    if (date.getMonth() < 9) text += '0';
    text += (date.getMonth() + 1);
    text += '-';
    if (date.getDate() < 10) text += '0';
    text += date.getDate();
    text += ' ';
    if (date.getHours() < 10) text += '0';
    text += date.getHours();
    text += ':';
    if (date.getMinutes() < 10) text += '0';
    text += date.getMinutes();
    text += ':';
    if (date.getSeconds() < 10) text += '0';
    text += date.getSeconds();

    return text;
};

function formatTimeInterval(start, end) {
    var INTERVAL_SECOND = 1000;
    var INTERVAL_MINUTE = 60 * INTERVAL_SECOND;
    var INTERVAL_HOUR = INTERVAL_MINUTE * 60;
    var INTERVAL_DAY = INTERVAL_HOUR * 24;
    var interval = end - start;

    var text = '';
    if (interval < 0) {
        text += '-';
        interval *= -1;
    }
    if (interval > INTERVAL_DAY) {
        text += Math.floor(interval / INTERVAL_DAY);
        text += ' d ';
        interval %= INTERVAL_DAY;
    }
    if (interval > INTERVAL_HOUR) {
        text += Math.floor(interval / INTERVAL_HOUR);
        text += ' h ';
        interval %= INTERVAL_HOUR;
    }
    if (interval > INTERVAL_MINUTE) {
        text += Math.floor(interval / INTERVAL_MINUTE);
        text += ' m ';
        interval %= INTERVAL_MINUTE;
    }

    text += Math.floor(interval / INTERVAL_SECOND);
    text += ' s';

    return text;
};

function generateDeletionLink1() {
	var month = $('#gen1Month').val();
	var day = $('#gen1Day').val();
	var year = $('#gen1Year').val();
	var hour = $('#gen1Hour').val();
	var minute = $('#gen1Minute').val();
	var type = $('input:radio[name=type]:checked').val();
	var timestamp = new Date(year, month, day, hour, minute, 0, 0);
	var html = '';
	html += '<div>Copiez ce code pour inclure le compte à rebours dans un message ou une page :</div>';
	html += '<div>';
	html += '<blockquote><strong>[[iframe https://fondationscp.github.io/outils/chronometre-suppression.html?timestamp=' + timestamp.getTime() + '&type=' + type + ' style="width: 400px; height: 78px;"]]</strong></blockquote>';
	html += '</div>';
	html += '<div>';
	html += '<iframe src="https://fondationscp.github.io/outils/chronometre-suppression.html?timestamp=' + timestamp.getTime() + '&type=' + type + '" style="width: 400px; height: 78px;"></iframe>';
	html += '</div>';
	$('#generated').html(html);
}

function generateDeletionLink2() {
	var day = $('#gen2Day').val();
	var hour = $('#gen2Hour').val();
	var minute = $('#gen2Minute').val();
	var type = $('input:radio[name=type2]:checked').val();
	var now = new Date();
	var timestamp = new Date(now.getTime() + (day * 24*60*60*1000) + (hour * 60*60*1000) + (minute * 60*1000));
	var html = '';
	html += '<div>Copiez ce code pour inclure le compte à rebours dans un message ou une page :</div>';
	html += '<div>';
	html += '<blockquote><strong>[[iframe https://fondationscp.github.io/outils/chronometre-suppression.html?timestamp=' + timestamp.getTime() + '&type=' + type + ' style="width: 400px; height: 78px;"]]</strong></blockquote>';
	html += '</div>';
	html += '<div>';
	html += '<iframe src="https://fondationscp.github.io/outils/chronometre-suppression.html?timestamp=' + timestamp.getTime() + '&type=' + type + '" style="width: 400px; height: 78px;"></iframe>';
	html += '</div>';
	$('#generated').html(html);
}

var timestamp;
var message1;
var message2;

function tick() {
	var now = new Date();
	var html = '';
	if (timestamp.getTime() > now.getTime()) {
		html += '<div style="color:red">' + message1 + ':</div>';
		html += '<div style="font-size:12pt;font-weight:bold">';
		html += formatTimeInterval(now.getTime(), timestamp.getTime());
		html += '</div>'
	} else {
		html += '<div style="color:green">' + message1 + ':</div>';
		html += '<div style="font-size:12pt;font-weight:bold">';
    html+= 'il y a '
		html += formatTimeInterval(timestamp.getTime(), now.getTime());
		html += '</div>'
	}
	$('#allcontent').html(html);
}

function initGenerators() {
	var vars = getUrlVars();
	var now = new Date();
	var i;
	var html = '';
	var type = 0;
	switch (vars["type"]) {
		case '1':
			message1 = "Le bannissement se terminera dans dans";
			message2 = "Le bannissement s'est terminé depuis";
			type = 1;
		break;
		case '0':
			message1 = "Cette page sera supprimée dans";
			message2 = "Cette page peut être supprimée depuis";
			type = 2;
		break;
		default:
			message1 = "Compte à rebours expiré dans";
			message2 = "Compte à rebours expiré depuis";
	}
	if (vars["timestamp"]) {
		//alert(vars["timestamp"]);
		timestamp = new Date(parseInt(vars["timestamp"]));
		tick();
		setInterval(tick, 1000);
		$('#allcontent').show();
		return;
	}
	html += '<div>';
	html += 'Timer Type: ';
	html += '<input type="radio" name="type" value="0" checked> Suppression &mdash; ';
	html += '<input type="radio" name="type" value="1"> Bannissement &mdash; ';
	html += '<input type="radio" name="type" value="2"> Générique/Autre';
	html += '</div>';
	html += '<div>';
	html += 'Supprimer le : ';
	html += '<select id="gen1Month" name="month">';
	html += '<option value="0"' + (now.getMonth() == 0 ? ' selected' : '') + '>Janvier</option>';
	html += '<option value="1"' + (now.getMonth() == 1 ? ' selected' : '') + '>Février</option>';
	html += '<option value="2"' + (now.getMonth() == 2 ? ' selected' : '') + '>Mars</option>';
	html += '<option value="3"' + (now.getMonth() == 3 ? ' selected' : '') + '>Avril</option>';
	html += '<option value="4"' + (now.getMonth() == 4 ? ' selected' : '') + '>Mai</option>';
	html += '<option value="5"' + (now.getMonth() == 5 ? ' selected' : '') + '>Juin</option>';
	html += '<option value="6"' + (now.getMonth() == 6 ? ' selected' : '') + '>Juillet</option>';
	html += '<option value="7"' + (now.getMonth() == 7 ? ' selected' : '') + '>Août</option>';
	html += '<option value="8"' + (now.getMonth() == 8 ? ' selected' : '') + '>Septembre</option>';
	html += '<option value="9"' + (now.getMonth() == 9 ? ' selected' : '') + '>Octobre</option>';
	html += '<option value="10"' + (now.getMonth() == 10 ? ' selected' : '') + '>Novembre</option>';
	html += '<option value="11"' + (now.getMonth() == 11 ? ' selected' : '') + '>Décembre</option>';
	html += '</select>';
	html += '<select id="gen1Day" name="day">';
	for (i = 1; i < 32; i ++) {
		html += '<option value="' + i + '"' + (now.getDate() == i ? ' selected' : '') + '>' + i + '</option>';
	}
	html += '</select>';
	html += '<select id="gen1Year" name="year">';
	for (i = 2022; i < 2027; i ++) {
		html += '<option value="' + i + '"' + (now.getFullYear() == i ? ' selected' : '') + '>' + i + '</option>';
	}
	html += '</select>';
	html += ' at ';
	html += '<select id="gen1Hour" name="hour">';
	for (i = 0; i < 24; i ++) {
		html += '<option value="' + i + '"' + (now.getHours() == i ? ' selected' : '') + '>' + (i < 10 ? '0' : '') + i + '</option>';
	}
	html += '</select>';
	html += '<select id="gen1Minute" name="minute">';
	for (i = 0; i < 60; i ++) {
		html += '<option value="' + i + '"' + (now.getMinutes() == i ? ' selected' : '') + '>' + (i < 10 ? '0' : '') + i + '</option>';
	}
	html += '</select>';
	html += ' <input type="submit" value="Générer !" />';
	html += '</div>';

	$("#genForm1Contents").html(html);
	html = '';
	html += '<div>';
	html += 'Timer Type: ';
	html += '<input type="radio" name="type2" value="0" checked> Suppression &mdash; ';
	html += '<input type="radio" name="type2" value="1"> Bannissement &mdash; ';
	html += '<input type="radio" name="type2" value="2"> Générique/Autre';
	html += '</div>';
	html += '<div>';
	html += 'Supprimer après : ';
	html += '<select id="gen2Day" name="day">';
	for (i = 0; i < 31; i ++) {
		html += '<option value="' + i + '">' + i + '</option>';
	}
	html += '</select>';
	html += ' days ';
	html += '<select id="gen2Hour" name="hour">';
	for (i = 0; i < 24; i ++) {
		html += '<option value="' + i + '">' + i + '</option>';
	}
	html += '</select>';
	html += ' hours ';
	html += '<select id="gen2Minute" name="minute">';
	for (i = 0; i < 60; i ++) {
		html += '<option value="' + i + '">' + i + '</option>';
	}
	html += '</select>';
	html += ' minutes ';
	html += '<input type="submit" value="Générer !" />';
	$("#genForm2Contents").html(html);
	$('#allcontent').show();
}
