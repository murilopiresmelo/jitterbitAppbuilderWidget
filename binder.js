/*
* Vinyl Widget:
* Name: Rating Bars
* Developer: Andrew Connor
* Date: 3/23/2016
*/

define(function () {
  var install = function (holderElement, context) {
    var $holderElement = $(holderElement.childNodes[0]);

    var cell = context.getCell();
    var row = context.getRow();

    // console.log(row);
    // console.log(row.getCellByColumnName("Max Value"));
    // console.log(row.getCellByColumnName("Step Size"));
    // console.log(row.getCellByColumnName("Symbol Type"));

    var valueOptions,
        theme,
        readOnly,
        showValues,
        showSelectedRating;

    try {
      valueOptions = context.getParameter("RatingValueOptions").split(',');
      theme = context.getParameter("RatingTheme");
    }
    catch(err) {
      console.log(err.message);
      valueOptions = [1, 2, 3, 4, 5];
      theme = 'fontawesome-stars';
    }

    switch(theme) {
      default:
      case 'bars-1to10':
      case 'bars-movie':
      case 'css-stars':
      case 'fontawesome-stars':
        showValues = false;
        showSelectedRating = true;
        break;
      case 'bars-square':
      case 'bars-pill':
        showValues = true;
        showSelectedRating = false;
        break;
    }

    for (var i in valueOptions){
      var value = valueOptions[i];
      $holderElement.append("<option value='" + value + "'>" + value + "</option>");
    }

    if (row.viewModel.isEditState() === false) {
      readOnly = true;
    } else {
      readOnly = false;
    }

    var options = {
      initialRating: cell.value,
      theme: theme,
      // readonly: readOnly,
      showValues: showValues,
      showSelectedRating: showSelectedRating,
      onSelect:function(value, text) {
        if (row.viewModel.isEditState() === false) {
          row.edit();
          cell.value = value;
          row.save();
        } else {
          cell.value = value;
        }
      }
    };

    $holderElement.barrating(options);
  };

  var uninstall = function (holderElement, context) {
  };

  return {
    callbacks: {
      events: {
        install: install,
        uninstall: uninstall
      }
    }
  };
});
