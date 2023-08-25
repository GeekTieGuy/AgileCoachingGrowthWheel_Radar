var chartTitle = 'Agile Coaching Growth Wheel';

var colorDefs = {
  default: '#268ed9',
};

var themeSelf = [
  { id: 1, label: 'Self Mastery', color: '#e3342f', weight: 3, },
];

var themes = [
  //{ id: 1, label: 'Self Mastery', color: '#e3342f', weight: 3, },
  { id: 2, label: 'Agile and Lean Practitioner', color: '#f6993f', weight: 2 },
  { id: 3, label: 'Serving', color: '#ffed4a', weight: 2 },
  { id: 4, label: 'Coaching', color: '#38c172', weight: 2 },
  { id: 5, label: 'Facilitating', color: '#4dc0b5', weight: 2 },
  { id: 6, label: 'Guided Learning', color: '#3490dc', weight: 3 },
  { id: 7, label: 'Advising', color: '#6574cd', weight: 3 },
  { id: 8, label: 'Leading', color: '#9561e2', weight: 3 },
  { id: 9, label: 'Transforming', color: '#f66d9b', weight: 3 },
];

var competenciesSelf = [
  { id: 1, group: 1, label: 'Emotional Intelligence' },
  { id: 2, group: 1, label: 'Balance' },
  { id: 3, group: 1, label: 'Personal Transformation' },
];

var competenciesWheel = [
  { id: 4, group: 2, label: 'Agile and Lean Mindset' },
  { id: 5, group: 2, label: 'Frameworks and Practices' },
  { id: 6, group: 3, label: 'Serving the Business' },
  { id: 7, group: 3, label: 'Serving the Team' },
  { id: 8, group: 4, label: 'Coaching Mindset' },
  { id: 9, group: 4, label: 'Coaching Skills' },
  { id: 10, group: 5, label: 'Facilitation Mindset' },
  { id: 11, group: 5, label: 'Facilitation Skills' },
  { id: 12, group: 6, label: 'Learning Mindset' },
  { id: 13, group: 6, label: 'Mentoring' },
  { id: 14, group: 6, label: 'Teaching' },
  { id: 15, group: 7, label: 'Advising Mindset' },
  { id: 16, group: 7, label: 'Advising Skills' },
  { id: 17, group: 8, label: 'Visionary' },
  { id: 18, group: 8, label: 'Role Modeling' },
  { id: 19, group: 8, label: 'Leading for Growth' },
  { id: 20, group: 9, label: 'Organization Change' },
  { id: 21, group: 9, label: 'Organization Design' },
];

var employee_1 = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 1 },
  { id: 7, value: 2 },
  { id: 8, value: 3 },
  { id: 9, value: 4 },
  { id: 10, value: 5 },
  { id: 11, value: 1 },
  { id: 12, value: 2 },
  { id: 13, value: 3 },
  { id: 14, value: 4 },
  { id: 15, value: 5 },
  { id: 16, value: 1 },
  { id: 17, value: 2 },
  { id: 18, value: 3 },
  { id: 19, value: 4 },
  { id: 20, value: 5 },
  { id: 21, value: 1 },
];

function makeSeriesDataSelf(employeeInput) {
  if (Array.isArray(employeeInput)) {
    return competenciesSelf.map((theme) => {
      const ei = employeeInput.find((eInfo) => {
        return theme.id === eInfo.id;
      });
      if (!ei) {
        return { x: theme.label, value: 0, color: 'gray' };
      }
      const group = themeSelf.find((g) => g.id === theme.group);
      return { x: theme.label, value: ei.value, color: group.color };
    });
  }
  return [
    { x: 'NO DATA', value: 0 },
  ];
}

function makeSeriesData(employeeInput) {
  if (Array.isArray(employeeInput)) {
    return competenciesWheel.map((theme) => {
      const ei = employeeInput.find((eInfo) => {
        return theme.id === eInfo.id;
      });
      if (!ei) {
        return { x: theme.label, value: 0, color: 'gray' };
      }
      const group = themes.find((g) => g.id === theme.group);
      return { x: theme.label, value: ei.value, color: group.color };
    });
  }
  return [
    { x: 'NO DATA', value: 0 },
  ];
}


function getFormData() {
  for (var i = 0; i < competenciesWheel.length + competenciesSelf.length; i++) {
    var competency = document.getElementById("competency" + (i));
    var assessment = parseInt(competency.value);
    employee_1[i].value = assessment;
  }
  return employee_1;
}


function drawWheel()
{

  
  var container_ID = document.getElementById("container");
  var chartNode_ID = container_ID.children[0];
  if (chartNode_ID != null) {
    container_ID.removeChild(chartNode_ID);
  }

  var container_ID = document.getElementById("containerSelfMastery");
  var chartNode_ID = container_ID.children[0];
  if (chartNode_ID != null) {
    container_ID.removeChild(chartNode_ID);
  }


  employee_1 = getFormData();

  anychart.theme('darkGlamour');
  var chart = anychart.polar();
  
  // Make series data
  var data1 = makeSeriesData(employee_1);
  
  // set x-scale
  chart.xScale('ordinal');
  
  // disable y-axis to hide numeric values
  chart.yAxis(true);
  chart.yAxis()
    .overlapMode('allow-overlap');
  chart.yScale()
    .minimum(0)
    .maximum(5)
    .ticks({ interval: 1 });
  
    // connect data from employee object
  var columnSeries1 = chart.column(data1);
  
  // series name for tooltip
  columnSeries1.name('Self-Rating');
  chart.yAxis().zIndex(100);
  columnSeries1.zIndex(50);
  
  // set the width of points for series
  var pointWidth = Math.floor(360 / competenciesWheel.length);
  columnSeries1.pointWidth(pointWidth);
  
  // set the color for radar columns
  columnSeries1.fill(function (a) {
    var dt = data1[a.index];
    var clr = colorDefs.default;
    if (dt?.color) {
      clr = dt.color;
    }
    return clr;
  });

  columnSeries1.stroke(function (a) {
    var dt = data1[a.index];
    var clr = colorDefs.default;
    if (dt?.color) {
      clr = dt.color;
    }
    return clr;
  });
  
  // set labels setting
  var labels = chart.xAxis().labels();
  labels.fontSize(12).fontColor(colorDefs.default);
  labels.fontFamily("Courier");
  labels.background(false);
  chart.listen('chartDraw', function () {
    data1.forEach(function (di, idx) {
      var lbl = chart.xAxis().labels().getLabel(idx);
      lbl.fontColor(di.color);
      lbl.draw();
    });
  });
  
  // set the tooltip title
  chart.tooltip().title().fontColor('#ddb32b');
  // set tooltip content
  chart.tooltip().format("{%seriesName}: {%value}").fontSize(14).fontWeight(600);
  // set tooltip font color for series 1
  columnSeries1.tooltip().fontColor('#2db2a5');
  
  chart
    .title()
    .enabled(true)
    .text(chartTitle)
    .fontSize(16)
    .fontColor("#d5dcdc");
  columnSeries1.zIndex(1);

  chart.container('container');
  chart.padding({ bottom: 20 });
  chart.draw();

  var chartSelf = anychart.column();
  var data2 = makeSeriesDataSelf(employee_1);
  var dataSelf = [];
  data2.forEach((dataItem, index, all) =>
    {
      var columnDataItem = [ dataItem.x, dataItem.value];
      dataSelf.push(columnDataItem);
    }
  );
  var seriesSelf = chartSelf.column(dataSelf);
  chartSelf.yScale()
    .minimum(0)
    .maximum(5)
    .ticks({ interval: 1 });
  chartSelf.container('containerSelfMastery');
  chartSelf.draw();


  localStorage.setObj("self-assessment", employee_1);
  
  var parent_element = document.getElementById("cellWheel");
  var existing_buttons = parent_element.querySelectorAll('button');
  existing_buttons.forEach(function(button) {
    parent_element.removeChild(button);
  });
  addExportButton(chart, "Export wheel PNG", "wheel", "cellWheel");
  
  var parent_element = document.getElementById("cellColumn");
  var existing_buttons = parent_element.querySelectorAll('button');
  existing_buttons.forEach(function(button) {
    parent_element.removeChild(button);
  });
  addExportButton(chartSelf, "Export column PNG", "column", "cellColumn");
}

function addExportButton(chart, buttonText, filename, parentElement)
{
  var exportButton = document.createElement('button');
  exportButton.textContent = buttonText;
  exportButton.addEventListener('click', function () {
    chart.saveAsPng({"filename":filename});
  });
  exportButton.style.marginTop = "10px";
  var parent = document.getElementById(parentElement);
  parent.appendChild(exportButton);
}

//anychart.onDocumentReady(drawWheel);

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

window.onload = function(){
  var self_assessment = localStorage.getObj("self-assessment");
  if (self_assessment != null) {
    employee_1 = self_assessment;
  }

  var elementsOffset = 0;
  addDataManipulationUIElements(competenciesSelf, elementsOffset);

  elementsOffset = 3;
  addDataManipulationUIElements(competenciesWheel, elementsOffset);
};

function addDataManipulationUIElements(competenciesWheel, elementsOffset) {
  var competenciesCount = competenciesWheel.length;
  for (var i = 0; i < competenciesCount; i++) {
    var form = document.getElementById("data");

    var selectLabel = document.createElement('label');
    selectLabel.innerText = competenciesWheel[i].label + ":";
    form.appendChild(selectLabel);

    var selectItem = document.createElement('select');
    selectItem.name = competenciesWheel[i].label;
    selectItem.id = "competency" + (i + elementsOffset); //i+3 skips the self-mastery ones

    for (var opt = 1; opt < 6; opt++) {
      var option = document.createElement('option');
      option.value = opt;
      option.text = opt;

      if (employee_1[i + elementsOffset].value === opt) { //i+3 skips the self-mastery ones
        option.selected = true;
      }
      selectItem.options.add(option);
    }
    form.appendChild(selectItem);

    var breakElement = document.createElement('br');
    form.appendChild(breakElement);
  }
}
