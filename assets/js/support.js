
// 是否支持 HTML5 新属性
var H5_support = '1.0';

var element = function(id){ return document.getElementById(id);}
var errorMessage = undefined;
var elemStatus;


function getOpenDatabase(){
  try{
    if(!! window.openDataBase)
      return window.openDataBase;
    else
      return undefined;
  }
  catch(ev){
    return undefined;
  }
}


function getLocalStorage(){
  try{
    if(!! window.localStorage)
      return window.localStorage;
    else
      return undefined;
  }
  catch(ev){
    return undefined;
  }
}


function getSessionStorage(){
  try{
    if(!! window.sessionStorage)
      return window.sessionStorage;
    else
      return undefined;
  }
  catch(ev){
    return undefined;
  }
}


function dispError(msg){
  errorMessage = `<p class="error">${msg}</p>`;
  haveError = true;
}


function statusMessage(msg){
  if(!elemStatus)
    elemStatus = element('statusMessage'); // 获取ID
  
  if(!elemStatus) return;
  
  if(msg) elemStatus.innerHTML = msg; //如果有信息，输出信息，否则输出空
  else
    elemStatus.innerHTML = '&nbsp;';
}


function bwTable(wrap){
  // default true
  this.wrap = (wrap == undefined) ? true : wrap;
  this.rows = new Array();
  this.header = [];
  
  
  this.setHeader = function(row){
    this.header = row;
  }
  
  this.addRow = function(row){
    this.rows.push(row);
  }
  
  this.updateRow = function(index, row){
    this.rows[index] = row;
  }
  
  this.getRow = function(index){
    return this.rows[index];
  }
  
  this.countRows = function(){
    return this.rows.length;
  }
  
  this.getTableHTML = function(){
    var table = '';
    if(this.wrap){
      table += `<table class="bwTable">`;
    }
    
    table += this.getHeaderHTML();
    for(var row in this.rows){
      table += this.getRowHTML(this.rows[row]);
    }
    if(this.wrap){
      table += '</table>';
    }
    return table;
  }
  
  this.getHeaderHTML = function(){
    if(this.header.length ==0) return '';
    var tr = '<tr>';
    for(var column in this.header){
      tr += `<th>${this.header[column]}</th>`;
    }
    tr += '<tr>';
    return tr;
  }
  
  this.getRowHTML = function(row){
    var tr = '<tr>';
    for(var column in row){
      var cell = row[column];
      if(cell ==null){
        cell = `<mark>NULL</mark>`;
      }
      tr += `<td>${cell}</td>`;
    }
    tr += '</tr>';
    return tr;
  }
  
  this.writeTable = function(){
    document.write( this.getTableHTML() );
  }
}























