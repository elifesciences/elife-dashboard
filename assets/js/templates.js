var glob = ('undefined' === typeof window) ? global : window,

Handlebars = glob.Handlebars || require('handlebars');

this["eLife"] = this["eLife"] || {};
this["eLife"]["templates"] = this["eLife"]["templates"] || {};

Handlebars.registerPartial("article-item", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"article__icon\">\n                <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n            </a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "file-icon-"
    + container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"lowercase","hash":{},"data":data}));
},"4":function(container,depth0,helpers,partials,data) {
    return "file-icon-none";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <span class=\"article__icon\">\n            <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n        </span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "                <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n                    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "\n                </a>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"doi","hash":{},"data":data}) : helper)));
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Not yet available ("
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + ")";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "<span class=\"fa e-icon xs danger fa-exclamation-triangle\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"There is a problem with this article ID is null\"></span>";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <p>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + "            </p>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    "
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                <dl>\n                    <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.program(25, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dt>\n                    <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.program(29, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dd>\n                </dl>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Version:</i></a>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "                            <i>Version:</i>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            "
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"version","hash":{},"data":data}) : helper)))
    + "\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <dl>\n                <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.program(34, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dt>\n                <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.program(38, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dd>\n            </dl>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n";
},"34":function(container,depth0,helpers,partials,data) {
    return "                        <i>Article type:</i>\n";
},"36":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"article-type","hash":{},"data":data}) : helper)))
    + "\n";
},"40":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <dl>\n                <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.program(43, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dt>\n                <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.program(47, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dd>\n            </dl>\n";
},"41":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n";
},"43":function(container,depth0,helpers,partials,data) {
    return "                        <i>Publication date:</i>\n";
},"45":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"47":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "\n";
},"49":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n            <dl>\n                <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.program(52, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dt>\n                <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(54, data, 0),"inverse":container.program(56, data, 0),"data":data})) != null ? stack1 : "")
    + "                </dd>\n            </dl>\n";
},"50":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n";
},"52":function(container,depth0,helpers,partials,data) {
    return "                        <i>Corresponding authors:</i>\n";
},"54":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"56":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "\n";
},"58":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <p>\n                <b>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"if","hash":{},"fn":container.program(59, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"if","hash":{},"fn":container.program(64, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </b>\n            </p>\n";
},"59":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(60, data, 0),"inverse":container.program(62, data, 0),"data":data})) != null ? stack1 : "");
},"60":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-type"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"62":function(container,depth0,helpers,partials,data) {
    return "                            "
    + container.escapeExpression((helpers.uppercase || (depth0 && depth0.uppercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["event-type"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "\n";
},"64":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <br />\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(65, data, 0),"inverse":container.program(67, data, 0),"data":data})) != null ? stack1 : "");
},"65":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers.uppercase || (depth0 && depth0.uppercase) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "</a>\n";
},"67":function(container,depth0,helpers,partials,data) {
    return "                            "
    + container.escapeExpression((helpers.uppercase || (depth0 && depth0.uppercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["event-status"] : depth0),{"name":"uppercase","hash":{},"data":data}))
    + "\n";
},"69":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <a href=\""
    + alias4(((helper = (helper = helpers["preview-link"] || (depth0 != null ? depth0["preview-link"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preview-link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"btn btn-default btn-block preview\">\n                <span class=\"fa fa-eye\"></span>\n                Preview\n            </a>\n            <button class=\"btn btn-default  btn-block schedule schedule-btn\" id=\"schedule-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"modal\"\n                    data-action-type=\"schedule\"\n                    data-title=\"Schedule Article\"\n                    data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                <span class=\"fa fa-calendar\"></span>\n                Schedule\n            </button>\n            <button class=\"btn btn-default publish btn-publish btn-block\" data-toggle=\"modal\"\n                    data-target=\"#publish-modal\"\n                    type=\"button\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                <span class=\"fa fa-globe\"></span>\n                Publish Now\n            </button>\n            <div class=\"checkbox\">\n                <label>\n                    <input type=\"checkbox\" id=\"checkbox-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"toggle-publish-all\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> Batch Publishing\n                </label>\n            </div>\n";
},"70":function(container,depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"72":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["scheduled-publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(73, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"73":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "\n                <p><strong><span\n                        class=\"text-uppercase\">Scheduled</span><br/>"
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "\n                </strong></p><br/>\n                <button class=\"btn btn-default btn-block schedule schedule-amend-btn\" data-action-type=\"schedule-amend\"  id=\"schedule-amend-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"modal\"\n                        data-target=\"#schedule-modal\"\n                        data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                        data-title=\"Re-schedule Article\"\n                        data-scheduled=\""
    + alias3(((helper = (helper = helpers["scheduled-publication-date"] || (depth0 != null ? depth0["scheduled-publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"scheduled-publication-date","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                    <span class=\"fa fa-calendar\"></span>\n                    Re-Schedule\n                </button>\n                <button class=\"btn btn-default btn-block schedule schedule-cancel-btn\" data-action-type=\"schedule-cancel\" id=\"schedule-cancel-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"modal\"\n                        data-target=\"#schedule-modal\"\n                        data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                        data-article-doi=\""
    + alias3(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n                        data-title=\"Cancel Schedule\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                    <span class=\"fa fa-calendar-minus-o\"></span>\n                    Cancel\n                </button>\n\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"article__row\" data-article-title=\""
    + alias4(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-version=\""
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-run=\""
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\"\n    data-article-doi=\""
    + alias4(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n    data-action=\"publish\">\n    <td class=\"article__col article__col__icon\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"article__col article__col__title\">\n        <h6 class=\"article__title\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "\n        </h6>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"article__col article__col__info\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.version : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["article-type"] : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["corresponding-authors"] : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </td>\n    <td class=\"article__col article__col__status\">\n"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"isnt","hash":{},"fn":container.program(58, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"article__col article__col__action\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"uir",{"name":"is","hash":{},"fn":container.program(69, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.section : depth0),"scheduled",{"name":"is","hash":{},"fn":container.program(72, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        &nbsp;\n    </td>\n</tr>";
},"useData":true}));

Handlebars.registerPartial("article-detail-actions", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <a href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1), depth0))
    + "\" target=\"_blank\" class=\"btn btn-default\">\n                <span class=\"fa fa-eye\"></span>\n                Preview\n            </a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"row detail-cta\">\n    <div class=\"col-md-6\">\n        <span class=\"article-detail-scheduled\"></span>\n    </div>\n    <div class=\"col-md-6 text-right\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["preview-link"] : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <span class=\"article-detail-actions btn-group\"></span>\n    </div>\n</div>\n";
},"useData":true}));

Handlebars.registerPartial("article-detail", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "file-icon-"
    + container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
    return "file-icon-none";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <dl>\n                <dt><i>Run id:</i></dt>\n                <dd>"
    + container.escapeExpression(((helper = (helper = helpers.currentRun || (depth0 != null ? depth0.currentRun : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentRun","hash":{},"data":data}) : helper)))
    + "</dd>\n            </dl>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <dl>\n                <dt><i>Article type:</i></dt>\n                <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1), depth0))
    + "</dd>\n            </dl>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <dl>\n                <dt><i>Publication date:</i></dt>\n                <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1), depth0))
    + "</dd>\n            </dl>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <dl>\n                <dt><i>Corresponding authors:</i></dt>\n                <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1), depth0))
    + "</dd>\n            </dl>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <dl>\n                <dt><i>Authors:</i></dt>\n                <dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1), depth0))
    + "</dd>\n            </dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<section class=\"article-detail\" id=\"article-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n    <table class=\"article-list\">\n        <tr class=\"article__row\">\n            <td class=\"article__col article__col__icon\">\n                <span class=\"article__icon\">\n                    <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                </span>\n            </td>\n            <td class=\"article__col article__col__title\">\n                <h6 class=\"article-doi article__title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "</h6>\n                <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.title : stack1), depth0))
    + "</p>\n            </td>\n            <td class=\"article__col article__col__action\">\n                <dl>\n                    <dt><i>Version:</i></dt>\n                    <dd><strong>"
    + alias2(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "</strong></dd>\n                    <dt><i>Run:</i></dt>\n                    <dd><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1["run-number"] : stack1), depth0))
    + "</strong></dd>\n                </dl>\n            </td>\n        </tr>\n    </table>\n    <div class=\"elf-well\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.currentRun : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["article-type"] : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["publication-date"] : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1["corresponding-authors"] : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.authors : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</section>";
},"useData":true}));

Handlebars.registerPartial("article-event-timeline", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"article-event-timeline__row\">\n    <div class=\"article-event-timeline__status\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"start",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"end",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["event-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <span class=\"line\"></span>\n    </div>\n    <div class=\"article-event-timeline__title\"><p>"
    + alias4(((helper = (helper = helpers["event-type"] || (depth0 != null ? depth0["event-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-type","hash":{},"data":data}) : helper)))
    + "</p></div>\n    <div class=\"article-event-timeline__detail\">\n        <div>\n            <dl>\n                <dt><i>Timestamp:</i></dt>\n                <dd class=\"divide\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"DD/MM/YYYY",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + " "
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["event-timestamp"] : depth0),"HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</dd>\n            </dl>\n            <dl>\n                <dt><i>Message:</i></dt>\n                <dd>"
    + alias4(((helper = (helper = helpers["event-message"] || (depth0 != null ? depth0["event-message"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"event-message","hash":{},"data":data}) : helper)))
    + "</dd>\n            </dl>\n        </div>\n    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <span class=\"fa e-icon md info fa-cog status-icon\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <span class=\"fa e-icon md success fa-check status-icon\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <span class=\"fa e-icon md danger fa-times status-icon\" title=\""
    + container.escapeExpression(((helper = (helper = helpers["event-status"] || (depth0 != null ? depth0["event-status"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"event-status","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"article-event-timeline\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1.events : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</section>";
},"useData":true}));

Handlebars.registerPartial("version-run-nav", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "            <li class=\""
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.details : depth0)) != null ? stack1["version-number"] : stack1),(depths[1] != null ? depths[1].currentVersion : depths[1]),{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\">\n                <span class=\"version-container\">\n                    <span class=\"version\">Version "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.details : depth0)) != null ? stack1["version-number"] : stack1), depth0))
    + "\n                    </span>\n                    <span class=\"status\"><span\n                            class=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + " \"></span></span>\n                </span>\n                <ol class=\"run-container\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = blockParams[0][0]) != null ? stack1.runs : stack1),{"name":"each","hash":{},"fn":container.program(8, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </ol>\n\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "active";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "file-icon-"
    + container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = blockParams[1][0]) != null ? stack1.details : stack1)) != null ? stack1.status : stack1),{"name":"lowercase","hash":{},"data":data,"blockParams":blockParams}));
},"6":function(container,depth0,helpers,partials,data) {
    return "file-icon-none";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression, alias5="function";

  return "                        <li class=\"run "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1),(depths[2] != null ? depths[2].currentVersion : depths[2]),{"name":"is","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                            <a href=\"/article/"
    + alias4(alias3(((stack1 = (depths[2] != null ? depths[2].article : depths[2])) != null ? stack1.id : stack1), depth0))
    + "/"
    + alias4(alias3(((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1), depth0))
    + "/"
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\" data-version=\""
    + alias4(alias3(((stack1 = (depths[1] != null ? depths[1].details : depths[1])) != null ? stack1["version-number"] : stack1), depth0))
    + "\" data-run=\""
    + alias4(((helper = (helper = helpers["run-id"] || (depth0 != null ? depth0["run-id"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-id","hash":{},"data":data}) : helper)))
    + "\">\n                                <span class=\"title\">Run "
    + alias4(((helper = (helper = helpers["run-number"] || (depth0 != null ? depth0["run-number"] : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"run-number","hash":{},"data":data}) : helper)))
    + "</span>\n                                <span class=\"date\">"
    + alias4((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["first-event-timestamp"] : depth0),"DD/MM/YYYY HH:mm:ss",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</span>\n                                <span class=\"icon\"><span class=\"fa fa-chevron-right\"></span></span>\n                            </a>\n                        </li>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["run-id"] : depth0),(depths[2] != null ? depths[2].currentRun : depths[2]),{"name":"is","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<section class=\"version-run-nav\">\n    <ol class=\"version-run-nav-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.versions : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ol>\n</section>";
},"useData":true,"useDepths":true,"useBlockParams":true}));

Handlebars.registerPartial("scheduled-article-item", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"article__icon\">\n                <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n            </a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "file-icon-"
    + container.escapeExpression((helpers.lowercase || (depth0 && depth0.lowercase) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"lowercase","hash":{},"data":data}));
},"4":function(container,depth0,helpers,partials,data) {
    return "file-icon-none";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <span class=\"article__icon\">\n                <span class=\"fa fa-file "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n            </span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"article-doi\">"
    + alias4(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <span class=\"article-doi\">"
    + container.escapeExpression(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"doi","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                Not yet available ("
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + ")\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "<span class=\"fa e-icon xs danger fa-exclamation-triangle\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"There is a problem with this article ID is null\"></span>";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <p>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "")
    + "            </p>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    "
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                    <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dt>\n                    <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.program(30, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dd>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Version:</i></a>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "                        <i>Version:</i>\n";
},"28":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"30":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        "
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"version","hash":{},"data":data}) : helper)))
    + "\n";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                <dl>\n                    <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.program(35, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dt>\n                    <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(37, data, 0),"inverse":container.program(39, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dd>\n                </dl>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Article type:</i></a>\n";
},"35":function(container,depth0,helpers,partials,data) {
    return "                            <i>Article type:</i>\n";
},"37":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"article-type","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            "
    + container.escapeExpression(((helper = (helper = helpers["article-type"] || (depth0 != null ? depth0["article-type"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"article-type","hash":{},"data":data}) : helper)))
    + "\n";
},"41":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                <dl>\n                    <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.program(44, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dt>\n                    <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(46, data, 0),"inverse":container.program(48, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dd>\n                </dl>\n";
},"42":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Publication date:</i></a>\n";
},"44":function(container,depth0,helpers,partials,data) {
    return "                            <i>Publication date:</i>\n";
},"46":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"48":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            "
    + container.escapeExpression(((helper = (helper = helpers["publication-date"] || (depth0 != null ? depth0["publication-date"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"publication-date","hash":{},"data":data}) : helper)))
    + "\n";
},"50":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                <dl>\n                    <dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(51, data, 0),"inverse":container.program(53, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dt>\n                    <dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(55, data, 0),"inverse":container.program(57, data, 0),"data":data})) != null ? stack1 : "")
    + "                    </dd>\n                </dl>\n";
},"51":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <a href=\"/article/"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"url","hash":{},"data":data}) : helper)))
    + "\"><i>Corresponding authors:</i></a>\n";
},"53":function(container,depth0,helpers,partials,data) {
    return "                            <i>Corresponding authors:</i>\n";
},"55":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <a href=\"/article/"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"57":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            "
    + container.escapeExpression(((helper = (helper = helpers["corresponding-authors"] || (depth0 != null ? depth0["corresponding-authors"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"corresponding-authors","hash":{},"data":data}) : helper)))
    + "\n";
},"59":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "            <p><strong><span\n                    class=\"text-uppercase\">Scheduled</span><br/>"
    + alias3((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || alias2).call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),"DD/MM/YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "\n            </strong></p><br/>\n            <button class=\"btn btn-default btn-block schedule schedule-amend-btn\" data-action-type=\"schedule-amend\" id=\"schedule-amend-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"modal\"\n                    data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                    data-title=\"Re-schedule Article\"\n                    data-scheduled=\""
    + alias3(((helper = (helper = helpers["scheduled-publication-date"] || (depth0 != null ? depth0["scheduled-publication-date"] : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"scheduled-publication-date","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(60, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                <span class=\"fa fa-calendar\"></span>\n                Re-Schedule\n            </button>\n            <button class=\"btn btn-default btn-block schedule schedule-cancel-btn\" data-action-type=\"schedule-cancel\" id=\"schedule-cancel-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"modal\"\n                    data-target=\"#schedule-modal\"\n                    data-article-id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                    data-article-doi=\""
    + alias3(((helper = (helper = helpers.doi || (depth0 != null ? depth0.doi : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"doi","hash":{},"data":data}) : helper)))
    + "\"\n                    data-title=\"Cancel Schedule\" "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(60, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                <span class=\"fa fa-calendar-minus-o\"></span>\n                Cancel\n            </button>\n";
},"60":function(container,depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<tr class=\"article__row\" id=\"article-"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <td class=\"article__col article__col__icon\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.url : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"article__col article__col__title\">\n        <h6 class=\"article__title\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.doi : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "            "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </h6>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td class=\"article__col article__col__info\">\n        <dl>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.version : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["article-type"] : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["corresponding-authors"] : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </dl>\n    </td>\n\n    <td class=\"article__col article__col__action\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["scheduled-publication-date"] : depth0),{"name":"if","hash":{},"fn":container.program(59, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n\n\n</tr>";
},"useData":true}));

this["eLife"]["templates"]["current/article-stats-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[0][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "            <div class=\"article-stats__section\">\n\n                <div class=\"stats__section__row\">\n                    <div class=\"stats__section__icon\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"error",{"name":"is","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"inProgress",{"name":"is","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(9, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                    <div class=\"stats__section__detail\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"error",{"name":"is","hash":{},"fn":container.program(11, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"inProgress",{"name":"is","hash":{},"fn":container.program(13, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(15, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[1][1],"scheduled",{"name":"is","hash":{},"fn":container.program(17, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n\n\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                            <a href=\"#error-list\" class=\"icon\"><span class=\"fa e-icon md danger fa-exclamation-triangle\"></span></a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                            <a href=\"#in-progress-list\" class=\"icon\"><span class=\"fa e-icon md info fa-cog\"></span></a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                            <a href=\"#uir-list\" class=\"icon\"><span class=\"fa e-icon md muted fa-hand-o-down \"></span></a>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                            <a href=\"#scheduled-list\" class=\"icon\"><span class=\"fa e-icon md warning fa-clock-o\"></span></a>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                            <a href=\"#error-list\">\n                                <span class=\"stats__section__val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                                <span class=\"stats__section__desc\">Articles with Errors</span>\n                            </a>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                            <a href=\"#inProgress-list\">\n                                <span class=\"stats__section__val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                                <span class=\"stats__section__desc\">Articles are in Progress</span>\n                            </a>\n";
},"15":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                            <a href=\"#uir-list\">\n                                <span class=\"stats__section__val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                                <span class=\"stats__section__desc\">Articles require User Input<br>(Ready to Publish)</span>\n                            </a>\n";
},"17":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                            <a href=\"#scheduled-list\">\n                                <span class=\"stats__section__val\">"
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? stack1.length : stack1), depth0))
    + "</span><br>\n                                <span class=\"stats__section__desc\">Articles are Scheduled</span>\n                            </a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div class=\"article-stats\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</div>\n\n\n";
},"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["current/article"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = blockParams[0][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "        <section class=\"article-list-section sticky\" id=\""
    + container.escapeExpression(container.lambda(blockParams[1][1], depth0))
    + "-list\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(alias1,blockParams[1][1],"uir",{"name":"is","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "            <table class=\"article-list\">\n"
    + ((stack1 = helpers["if"].call(alias1,blockParams[1][1],{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                <tbody>\n"
    + ((stack1 = helpers.each.call(alias1,blockParams[1][0],{"name":"each","hash":{},"fn":container.program(24, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                </tbody>\n            </table>\n        </section>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <button href=\"#\" class=\"btn btn-default btn-publish-all-selected btn-publish-queued\" data-toggle=\"modal\"\n                        data-target=\"#publish-modal\" type=\"button\">\n                    <span class=\"fa fa-globe\"></span>\n                    Publish All Selected\n                </button>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "                    <caption class=\"sticky-header\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"error",{"name":"is","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"inProgress",{"name":"is","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"uir",{"name":"is","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"scheduled",{"name":"is","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        <h4>\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"error",{"name":"is","hash":{},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"inProgress",{"name":"is","hash":{},"fn":container.program(16, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"uir",{"name":"is","hash":{},"fn":container.program(18, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,blockParams[2][1],"scheduled",{"name":"is","hash":{},"fn":container.program(20, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = blockParams[2][0]) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "                        </h4>\n                    </caption>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"fa e-icon md danger fa-warning  pull-left\"></span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"fa e-icon md info fa-cog  pull-left\"></span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"fa e-icon md muted fa-hand-o-down  pull-left\"></span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "                            <span class=\"fa e-icon md warning fa-clock-o  pull-left\"></span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                                Errors\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                                In Progress\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "                                User Input Required (Ready to Publish)\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "                                Scheduled\n";
},"22":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "                                <small>("
    + container.escapeExpression(container.lambda(((stack1 = blockParams[3][0]) != null ? stack1.length : stack1), depth0))
    + " Articles)</small>\n";
},"24":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["article-item"],depth0,{"name":"article-item","hash":{"section":blockParams[2][1]},"data":data,"blockParams":blockParams,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useBlockParams":true});

this["eLife"]["templates"]["detail/article-scheduled-for"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <p class=\"scheduled-for\"><span class=\"text-muted\">Scheduled for <em><strong>"
    + container.escapeExpression((helpers.elFormatUnixDate || (depth0 && depth0.elFormatUnixDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduleStatus : depth0)) != null ? stack1.scheduled : stack1),"MMMM D, YYYY h:mma",{"name":"elFormatUnixDate","hash":{},"data":data}))
    + "</strong></em></span></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduleStatus : depth0)) != null ? stack1.scheduled : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["detail/article"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"detail-errors\"></div>\n"
    + ((stack1 = container.invokePartial(partials["article-detail-actions"],depth0,{"name":"article-detail-actions","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row\">\n    <div class=\"col-md-3\">\n"
    + ((stack1 = container.invokePartial(partials["version-run-nav"],depth0,{"name":"version-run-nav","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"col-md-9\">\n"
    + ((stack1 = container.invokePartial(partials["article-detail"],depth0,{"name":"article-detail","hash":{"section":(depth0 != null ? depth0.articleDetail : depth0)},"data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["article-event-timeline"],depth0,{"name":"article-event-timeline","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["detail/buttons-publish"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<button class=\"btn btn-default publish btn-publish\" data-toggle=\"modal\" data-target=\"#publish-modal\"\n            type=\"button\"\n            data-action=\"publish\"\n            data-article-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "\"\n            data-article-doi=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "\"\n            data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n            data-article-version=\""
    + alias2(((helper = (helper = helpers.currentVersion || (depth0 != null ? depth0.currentVersion : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"currentVersion","hash":{},"data":data}) : helper)))
    + "\"\n            data-article-run=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentEvents : depth0)) != null ? stack1["run-id"] : stack1), depth0))
    + "\">\n        <span class=\"fa fa-globe\"></span>\n        Publish Now\n    </button>";
},"useData":true});

this["eLife"]["templates"]["detail/buttons-reschedule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<button class=\"btn btn-default schedule schedule-amend-btn\" data-action-type=\"schedule-amend\" id=\"schedule-amend-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-toggle=\"modal\"\n        data-target=\"#schedule-modal\"\n        data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n        data-title=\"Re-schedule Article\">\n    <span class=\"fa fa-calendar\"></span>\n    Re-Schedule\n</button>\n<button class=\"btn btn-default schedule schedule-cancel-btn\" id=\"schedule-cancel-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-action-type=\"schedule-cancel\" data-toggle=\"modal\"\n        data-target=\"#schedule-modal\"\n        data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n        data-article-doi=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currentArticle : depth0)) != null ? stack1.doi : stack1), depth0))
    + "\"\n        data-title=\"Cancel Schedule\">\n    <span class=\"fa fa-calendar-minus-o\"></span>\n    Cancel Schedule\n</button>";
},"useData":true});

this["eLife"]["templates"]["detail/buttons-schedule"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<button class=\"btn btn-default schedule schedule-btn\" id=\"schedule-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-action-type=\"schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\"  data-title=\"Schedule Article\"\n        data-article-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.article : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\n    <span class=\"fa fa-calendar\"></span>\n    Schedule\n</button>";
},"useData":true});

this["eLife"]["templates"]["error-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "    <div class=\"alert alert-muted "
    + container.escapeExpression(((helper = (helper = helpers.ref || (depth0 != null ? depth0.ref : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ref","hash":{},"data":data}) : helper)))
    + "\" id=\"error-detail\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.statusText : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"col-sm-6 text-right\">\n                <button class=\"btn btn-default\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseExample\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n                    Show Details\n                </button>\n            </div>\n        </div>\n        <div class=\"collapse\" id=\"collapseExample\">\n            <hr />\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.detail : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "                    <p class=\"status h5 text-uppercase\">\n                        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.statusCode : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        "
    + container.escapeExpression(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + "\n                        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    </p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.statusCode || (depth0 != null ? depth0.statusCode : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"statusCode","hash":{},"data":data}) : helper)))
    + ": ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "("
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + ")";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p class=\"detail\">"
    + container.escapeExpression(((helper = (helper = helpers.detail || (depth0 != null ? depth0.detail : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"detail","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.detail : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["error-message"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "alert-"
    + container.escapeExpression(((helper = (helper = helpers.errorType || (depth0 != null ? depth0.errorType : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"errorType","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "alert-danger";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "        <p class=\"status h5 text-uppercase\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.statusCode : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + container.escapeExpression(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.statusCode || (depth0 != null ? depth0.statusCode : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"statusCode","hash":{},"data":data}) : helper)))
    + ": ";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "("
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + ")";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p class=\"message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"error-message\" class=\"alert elf-alert "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.errorType : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " "
    + container.escapeExpression(((helper = (helper = helpers.ref || (depth0 != null ? depth0.ref : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ref","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.statusText : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});

this["eLife"]["templates"]["loading-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"loading-template text-center\"><div class=\"throbber-loader throbber-loader--small \"></div></div>";
},"useData":true});

this["eLife"]["templates"]["publish/article-publish-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"status-icon fa e-icon sm danger fa-times\"></span>\n        <br />\n        <span class=\"text-muted status-message\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return ":";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <div class=\"status-icon throbber-loader throbber-loader--small \"></div>\n        <br />\n        <span class=\"text-muted status-message\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "        <span class=\"status-icon fa e-icon sm success fa-check\"></span>\n        <br />\n        <span class=\"text-muted status-message\">"
    + alias3((helpers.capitalizeFirst || (depth0 && depth0.capitalizeFirst) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),{"name":"capitalizeFirst","hash":{},"data":data}))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<span class=\"article-status "
    + ((stack1 = (helpers.sanitize || (depth0 && depth0.sanitize) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"-",{"name":"sanitize","hash":{},"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"error",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"queued",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"ready to publish",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0["publication-status"] : depth0),"published",{"name":"is","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n\n";
},"useData":true});

this["eLife"]["templates"]["publish/article-publish-modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal fade\" id=\"publish-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" aria-labelledby=\"publish-modal\">\n    <div class=\"modal-dialog modal-md\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Publish article(s)</h4>\n            </div>\n            <div class=\"modal-body\">\n                Are you sure you want to publish the following article(s)?\n                <ol id=\"articles-queue\"></ol>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"publish-close\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary has-spinner\" id=\"publish-action\"></button>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-body"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.showArticleIdField : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <p>When do you want to schedule this article?</p>\n    <p class=\"article-cancel-info\"></p>\n    <br/>\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <input id=\"schedule-date\" name=\"date\" class=\"form-control datepicker schedule-field\" data-required type=\"text\" placeholder=\"Date\">\n        </div>\n    </div>\n    <br/>\n    <br/>\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <div class=\"timepicker-container\">\n                <div class=\"timepicker-hour\">\n                    <input id=\"schedule_hour_submit\" name=\"schedule_hour_submit\"\n                           class=\"form-control timepicker hourpicker schedule-field\"\n                           type=\"number\" placeholder=\"Hour\"  data-required data-min=\"0\" data-actual-min=\"1\" data-max=\"13\" data-actual-max=\"12\" maxlength=\"2\" data-validation=\"numeric\">\n                </div>\n                <div class=\"timepicker-divider\">:</div>\n                <div class=\"timepicker-minute\">\n                    <input id=\"schedule_minute_submit\" name=\"schedule_minute_submit\"\n                           class=\"form-control timepicker minutepicker schedule-field\"  data-required type=\"number\" placeholder=\"Minute\" data-min=\"-1\" data-actual-min=\"0\" data-max=\"60\" data-actual-max=\"59\"  maxlength=\"2\" data-validation=\"numeric\">\n                </div>\n                <div class=\"timepicker-ampm\">\n                    <select id=\"schedule_ampm_submit\" class=\"form-control timepicker ampmpicker schedule-field\"  data-required name=\"schedule_ampm_submit\">\n                        <option value=\"am\">am</option>\n                        <option value=\"pm\" selected=\"selected\">pm</option>\n                    </select>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br/>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <p>Please enter the numeric ID of the article you wish to publish:</p>\n        <br/>\n        <div class=\"form-group\">\n            <div class=\"col-sm-12\">\n                <input id=\"schedule-id\" name=\"id\" class=\"form-control article-id schedule-field\" data-required data-validation=\"numeric\" type=\"number\" placeholder=\"Article ID\" min=\"0\">\n            </div>\n        </div>\n        <br/>\n        <hr/>\n        <br/>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"alert alert-warning schedule-cancel-container\">\n        <p>Are you sure you want to cancel the publication of this article?</p>\n        <p class=\"article-cancel-info\"></p>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"cancel",{"name":"is","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-footer"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"schedule-close\">No</button>\n    <button type=\"button\" class=\"btn btn-primary has-spinner\" id=\"schedule-cancel-btn\">Yes</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id=\"schedule-close\">Close</button>\n    <button type=\"button\" class=\"btn btn-primary has-spinner\" id=\"schedule-action\">Schedule</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.actionType : depth0),"cancel",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal-status"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "    <div class=\"alert alert-success\" id=\"success-message\">\n"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule-cancel",{"name":"is","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias2).call(alias1,(depth0 != null ? depth0.actionType : depth0),"schedule-cancel",{"name":"isnt","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "            <p class=\"message\">This article has been unscheduled.</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <p class=\"message\">Your article has been successfully scheduled.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.response : depth0)) != null ? stack1.result : stack1),"success",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["eLife"]["templates"]["schedule/article-schedule-modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal fade\" id=\"schedule-modal\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\"\n     aria-labelledby=\"schedule-modal\">\n    <div class=\"modal-dialog modal-md\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                        aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\" id=\"myModalLabel\">Schedule article</h4>\n            </div>\n            <div class=\"modal-body\"></div>\n            <div class=\"modal-footer\"></div>\n        </div>\n    </div>\n</div>";
},"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-actions"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p class=\"text-right\">\n    <button class=\"btn btn-default schedule schedule-future\" id=\"future-schedule\" data-action-type=\"future-schedule\" data-toggle=\"modal\" data-target=\"#schedule-modal\" data-title=\"Add Scheduled Article\">\n        <span class=\"fa fa-clock-o\"></span>\n        Add Scheduled Article\n    </button>\n</p>";
},"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-content-calendar"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"schedule-calendar\" class=\"calendar\"></div>\n<br/>\n<p>\n    <span class=\"fc-event elf-event-bubble tmp\"><strong>3:40pm</strong> 09672 (tmp)</span> <br>\n    <strong>Temporary Article</strong> <br> Articles which have been scheduled but which are not yet in eLife Continuum system.\n</p>\n<br>\n<p>\n    <span class=\"fc-event elf-event-bubble\"><strong>4:17pm</strong> 09672</span> <br>\n    <strong>Article</strong> <br> Scheduled Articles which are in the eLife Continuum system.\n</p>";
},"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-content-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <section class=\"article-list-section sticky\" id=\"scheduled-list\">\n        <table class=\"article-list\">\n            <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduled : depth0)) != null ? stack1.articles : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </tbody>\n        </table>\n    </section>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["scheduled-article-item"],depth0,{"name":"scheduled-article-item","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "    <p class=\"text-center\">There are currently no articles scheduled.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.scheduled : depth0)) != null ? stack1.articles : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["eLife"]["templates"]["scheduled/scheduled-switcher"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "btn-primary";
},"3":function(container,depth0,helpers,partials,data) {
    return "btn-default";
},"5":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<div class=\"btn-group\">\n    <button type=\"button\" class=\"btn "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"list",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " schedule-page-switch "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"list",{"name":"is","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " \" data-switch=\"list\"><span\n            class=\"fa fa-list-ul\" aria-hidden=\"true\"></span> List\n    </button>\n    <button type=\"button\" class=\"btn "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"calendar",{"name":"is","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + " schedule-page-switch "
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || alias2).call(alias1,(depth0 != null ? depth0.currentView : depth0),"calendar",{"name":"is","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-switch=\"calendar\"><span\n            class=\"fa fa-calendar\" aria-hidden=\"true\"></span> Calendar\n    </button>\n</div>";
},"useData":true});

if (typeof exports === 'object' && exports) {module.exports = this["eLife"]["templates"];}