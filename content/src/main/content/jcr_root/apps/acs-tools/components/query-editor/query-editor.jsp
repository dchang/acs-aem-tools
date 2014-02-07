<%--
  #%L
  ACS AEM Tools Package
  %%
  Copyright (C) 2013 Adobe
  %%
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
       http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  #L%
  --%>
<%@include file="/libs/foundation/global.jsp" %>
<!doctype html>
<html ng-app="qeApp">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Query Editor | ACS AEM Tools</title>

    <cq:includeClientLib css="query-editor.app"/>
</head>

<body ng-controller="QueryEditorCtrl" ng-init="running = true; refresh()">

<header class="top">
    <div class="logo">
        <span><a href="/"><i class="icon-marketingcloud medium"></i></a></span>
        <span ng-hide="running"><span class="icon-spinner spinner medium"></span></span>
    </div>
</header>

<div class="page" role="main">
    <div class="content">

        <pre ui-ace="{
          mode: 'querybuilder',
          theme: 'monokai',
          onLoad: initEditor,
          onChange: refresh
        }" ng-model="source"></pre>

        <pre ui-ace="{
          mode: 'json',
          theme: 'monokai'
        }" ng-model="json" readonly="true"></pre>

    </div>
</div>

<footer ui-ace-statusbar="{editor:'test'}">
    <span ng-show="status.requesting" class="loader"></span>
    <span ng-hide="status.requesting">Query took {{status.duration / 1000 | number}} seconds</span>
</footer>

<cq:includeClientLib js="query-editor.app"/>
</body>
</html>