name: inverse
layout: true
class: center, middle, inverse
---
# Автоматизация тестовой инфраструктуры
<!-- [ri-mahrk] -->
.footnote[Антон Галицын, [2GIS](2gis.ru)]

???
Всем привет, меня зовут Антон, и сегодня мы поговорим об автоматизации тестовой инфраструктуры в 2ГИСе

---
## План
---
layout: false
.left-column[
  ## План
  ### Часть 1
]
.right-column[

- Что такое достоверные автотесты

- Об отделе Infrastrusture & Automation

- Какой была инфраструктура в конце 2013

]

???
Доклад состоит из 3х частей, первая - поговорим о том, что такое достоверные автотесты, существуют ил они? Потом об отделе Infrastrusture & Automation, в котором я работаю, и чем мы занимаемся. Он появился недавно, поэтому стоит отметить какой была инфраструктура в конце 2013, на момент создания тогда еще команды.

---
layout: false
.left-column[
  ## План
  ### Часть 1
  ### Часть 2
]
.right-column[

- Что такое достоверные автотесты

- Об отделе Infrastrusture & Automation

- Какой была инфраструктура в конце 2013

- Какие проблемы и потребности были у команд

- Внедрение OpenStack для IaaS

- Сценарии использования OpenStack
]

???
Во второй части мы обсудим какие проблемы в области инфраструктуры стояли перед командами. Почему мы решили, что будем внедрять OpenStack, и какие сценарии его использования у нас есть.

---
layout: false
.left-column[
  ## План
  ### Часть 1
  ### Часть 2
  ### Часть 3
]
.right-column[

- Что такое достоверные автотесты

- Об отделе Infrastrusture & Automation

- Какой была инфраструктура в конце 2013

- Какие проблемы и потребности были у команд

- Внедрение OpenStack для IaaS

- Сценарии использования OpenStack

- Развитие автоматизации и новые внутренние продукты на базе OpenStack
]

???
Напоследок я расскажу, как автоматизация получила дополнительный толчок в развитии и начали появляться новые внутренние продукты.

---
template: inverse

## Достоверные автотесты
---

### Достоверные автотесты

- Результат тестов повторяем

- Результат соответсвует реальной картине на бою

???
Достоверные автотесты - а бывают ли они? Я бы выделил 2 главных черты - результаты повторяемы, и они реально отражают ситуацию на бою.
Если они то падают, то нет, доверия к тестам нет и их просто скипают. Если в тестовой среде ничего не падает, а на бою падает, то в следующий раз тестировать будут прямо на бою.

---

### Достоверные автотесты

- Результат тестов повторяем

- Результат соответсвует реальной картине на бою

#### Как добиться?

Нужно окружение

- Легко развертываемое

- Приближенное к бою

???
Допустим тесты есть. А где и на чем их гонять? Нужно окружение.

---

### Достоверные автотесты

- Результат тестов повторяем

- Результат соответсвует реальной картине на бою

#### Как добиться?

Нужно окружение

- Легко развертываемое

- Приближенное к бою

#### Идеал

Полная копия боя с базой за 1 наносекунду у вас на ноутбуке.

???
Идеал - это копия боя, которая разворачивается за 1 наносекунду с полной боевой базы. Увы, в 2гис сервисы большие, их много и такое физически невозможно. Нужно инженерное решение.

---
template: inverse

## Infrastrusture & Automation

???
Поэтому у нас есть отдел, готовый решить эти проблемы
---
.left-column[
  ## IO
]
.right-column[
Отдел в 2ГИС, занимающийся:

- Интеграцией OpenStack

- Платформой для web и backend сервисов

- Автоматизацией HA баз данных

- Системой логирования и мониторинга

- Разработкой тулов для разработчиков

- Эксплуатацией боевой инфраструктуры

.footnote[.red[*] Мы используем python, ansible, docker, golang]

]

???
Мы занимаемся разными инфраструктурными проектами, такими как *список*, в частности сегодня говорить будем про OpenStack, в котором я работал в прошлом году.

---
.left-column[
  ## What is it?
  ## Why use it?
]
.right-column[
As the slideshow is expressed using Markdown, you may:

- Focus on the content, expressing yourself in next to plain text not worrying what flashy graphics and disturbing effects to put where

As the slideshow is actually an HTML document, you may:

- Display it in any decent browser

- Style it using regular CSS, just like any other HTML content

- Use it offline!

As the slideshow is contained in a plain file, you may:

- Store it wherever you like; on your computer, hosted from your Dropbox, hosted on Github Pages alongside the stuff you're presenting...

- Easily collaborate with others, keeping track of changes using your favourite SCM tool, like Git or Mercurial
]
---
template: inverse

## How does it work, then?
---
name: how

.left-column[
  ## How does it work?
### - Markdown
]
.right-column[
A Markdown-formatted chunk of text is transformed into individual slides by JavaScript running in the browser:

```remark
# Slide 1
This is slide 1

---

# Slide 2
This is slide 2
```

.slides[
  .first[
  ### Slide 1
  This is slide 1
  ]
  .second[
  ### Slide 2
  This is slide 2
  ]
]

Regular Markdown rules apply with only a single exception:

  - A line containing three dashes constitutes a new slide
  (not a horizontal rule, `&lt;hr /&gt;`)

Have a look at the [Markdown website](http://daringfireball.net/projects/markdown/) if you're not familiar with Markdown formatting.
]
---
.left-column[
  ## How does it work?
  ### - Markdown
  ### - Inside HTML
]
.right-column[
A simple HTML document is needed for hosting the styles, Markdown and the generated slides themselves:

```xml
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      /* Slideshow styles */
    </style>
  </head>
  <body>
    <textarea id="source">
      <!-- Slideshow Markdown -->
    &lt;/textarea&gt;
    <script type="text/javascript" src="remark.js">
    </script>
    <script type="text/javascript">
      var slideshow = remark.create();
    </script>
  </body>
</html>
```

You may download remark to have your slideshow not depend on any online resources, or reference the [latest version](https://github.com/gnab/remark/releases) online directly.
]
---
template: inverse

## Of course, Markdown can only go so far.
---
.left-column[
  ## Markdown extensions
]
.right-column[
To help out with slide layout and formatting, a few Markdown extensions have been included:

- Slide properties, for naming, styling and templating slides

- Content classes, for styling specific content

- Syntax highlighting, supporting a range of languages
]

---
.left-column[
  ## Markdown extensions
  ### - Slide properties
]
.right-column[
Initial lines containing key-value pairs are extracted as slide properties:

```remark
name: agenda
class: middle, center

# Agenda

The name of this slide is {{ name }}.
```

Slide properties serve multiple purposes:

* Naming and styling slides using properties `name` and `class`

* Using slides as templates using properties `template` and `layout`

* Expansion of `{{ property }}` expressions to property values

See the [complete list](https://github.com/gnab/remark/wiki/Slide-Properties) of slide properties.
]
---
.left-column[
  ## Markdown extensions
  ### - Slide properties
  ### - Content classes
]
.right-column[
Any occurences of one or more dotted CSS class names followed by square brackets are replaced with the contents of the brackets with the specified classes applied:

```remark
.footnote[.red.bold[*] Important footnote]
```

Resulting HTML extract:

```xml
<span class="footnote">
  <span class="red bold">*</span> Important footnote
</span>
```
]
---
.left-column[
  ## Markdown extensions
  ### - Slide properties
  ### - Content classes
  ### - Syntax Highlighting
]
.right-column[
Code blocks can be syntax highlighted by specifying a language from the set of [supported languages](https://github.com/gnab/remark/wiki/Configuration-Options#wiki-highlighting).

Using [GFM](http://github.github.com/github-flavored-markdown/) fenced code blocks you can easily specify highlighting language:

.pull-left[

    ```javascript
    function add(a, b)
      return a + b
    end
    ```
]
.pull-right[

    ```ruby
    def add(a, b)
      a + b
    end
    ```
]

A number of highlighting [styles](https://github.com/gnab/remark/wiki/Configuration-Options#wiki-highlighting) are available, including several well-known themes from different editors and IDEs.

]
---
.left-column[
  ## Presenter mode
]
.right-column[
To help out with giving presentations, a presenter mode comprising the
following features is provided:

- Display of slide notes for the current slide, to help you remember
  key points

- Display of upcoming slide, to let you know what's coming

- Cloning of slideshow for viewing on extended display
]
---
.left-column[
  ## Presenter mode
  ### - Inline notes
]
.right-column[
Just like three dashes separate slides,
three question marks separate slide content from slide notes:

```
Slide 1 content

???

Slide 1 notes

---

Slide 2 content

???

Slide 2 notes
```

Slide notes are also treated as Markdown, and will be converted in the
same manner slide content is.

Pressing __P__ will toggle presenter mode.
]
???
Congratulations, you just toggled presenter mode!

Now press __P__ to toggle it back off.
---
.left-column[
  ## Presenter mode
  ### - Inline notes
  ### - Cloned view
]
.right-column[
Presenter mode of course makes no sense to the audience.

Creating a cloned view of your slideshow lets you:

- Move the cloned view to the extended display visible to the audience

- Put the original slideshow in presenter mode

- Navigate as usual, and the cloned view will automatically keep up with the original

Pressing __C__ will open a cloned view of the current slideshow in a new
browser window.
]
---
template: inverse

## It's time to get started!
---
.left-column[
  ## Getting started
]
.right-column[
Getting up and running is done in only a few steps:

1. Visit the [project site](http://github.com/gnab/remark)

2. Follow the steps in the Getting Started section

For more information on using remark, please check out the [wiki](https://github.com/gnab/remark/wiki) pages.
]
---
name: last-page
template: inverse

## That's all folks (for now)!

Slideshow created using [remark](http://github.com/gnab/remark).
