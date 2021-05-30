// 创建方式
    // 字面量let str = 'abc';  typeof(str) = ' string '
    // 实例 let str = new String ();   typeof(str) = 'object'

const { log } = console

// 原型方法
// 1.charAt(index):返回对应字符串索引的内容。
// log('viewport'.charAt(2))//e
// log('viewport'.charAt(10))//空字符串

// 2.charCodeAt(index):返回对应的字符串索引的内容的unicode编码
// log('viewport'.charCodeAt(2)) //101

// 3.concat(string2, string3[, ..., stringN]) ：将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
// log('viewport'.concat('h','b')) //viewporthb
// log(String.prototype.concat.call('a','b','c')) //abc
// log(String.prototype.concat.apply('a',['b','c'])) //abc

// 4.endsWith(searchString[, length]) : 用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
// searchString:要搜索的子字符串 || length:在 str 中搜索的长度
// log('viewport'.endsWith('t',2)) //false
// log('viewport'.endsWith('t')) //true

// 5.startsWith(searchString[, fromIndex]) ： 判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
// fromIndex:开始位置  fromIndex <=0时，返回 0;fromIndex >0 且 <=str.length时，返回fromIndex;fromIndex >= str.length 时，返回 str.length。
// log('viewport'.startsWith('v',0)) //true
// log('viewport'.startsWith('v',3)) //false
// log('viewport'.startsWith('t',7)) //true

// 6.includes(searchString[,fromIndex]) : 方法用于判断一个字符串是否包含在另一个字符串中，返回 true 或 false。
// log('viewport'.includes('s')) //false
// log('viewport'.includes('t',7)) //true

// 7.indexOf(searchValue[, fromIndex]) : 返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
// log('viewport'.indexOf('e',-1)) //2
// log('viewport'.indexOf('e',4)) //-1
// log('viewport'.indexOf('t',7)) //7

// 8.lastIndexOf(searchValue[, fromIndex]) : 返回调用String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex处从后向前搜索。如果没找到这个特定值则返回-1 。
// log('vieowport'.lastIndexOf('o')) //6
// log('vieowport'.lastIndexOf('o', 0)) //-1
// log('vieowport'.lastIndexOf('o',4)) //3
// log('vieowport'.lastIndexOf('o',7)) //6

// 9.matchAll(regexp) : 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

// 10.padEnd(targetLength [, padString])： 用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
// targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
// padString：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。
// log('abc'.padEnd(10)) //'abd       '
// log('abc'.padEnd(10,'foo')) //'abcfoofoof'
// log('abc'.padEnd(4,'fksks')) //'abcf'
// log('abc'.padEnd(2)) //'abc'
// log('abc'.padEnd(2,'hshd')) //'abc'

// 11.padStart(targetLength [, padString]) : 用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。
// log('abc'.padStart(6)) //'   abc'
// log('abc'.padStart(6,'yt')) //'ytyabc'
// log('abc'.padStart(6,'ssdsdsd')) //'ssdabc'
// log('abc'.padStart(2)) //'abc'
// log('abc'.padStart(2,'sdfff')) //'abc'

// 12.repeat(count) : 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
// log('abc'.repeat(0)) //''
// log('abc'.repeat(1)) //abc
// log('abc'.repeat(2)) //abcabc
// log('abc'.repeat(2.5)) //abcabc

// 13.slice(beginIndex[,endIndex]) : 截取字符串
// beginIndex：从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待
// endIndex：可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex
// log('abcdefg'.slice(1,3)) //bc
// log('abcdefg'.slice(-2,6)) //f
// log('abcdefg'.slice(-2,2)) //空
// log('abcdefg'.slice(1,-1)) //bcdef

// 14.split([separator[, limit]]) : 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。
// separator: 指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。
// limit: 一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。
// log('abcdefghi'.split()) //[ 'abcdefghi' ]
// log('abcdefghi'.split(' ')) //[ 'abcdefghi' ]
// log('abcdefghi'.split('')) //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
// log('abcdefghi'.split('e')) //[ 'abcd', 'fghi' ]
// log('abcdefghi'.split('u')) //[ 'abcdefghi' ]
// log('abcdefghi'.split('',3)) //[ 'a', 'b', 'c' ]

// 15.substring(indexStart[,indexEnd]) : 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
// if (indexStart = endStart) {
//     返回substring返回空的字符串
// } else if(indexStart > indexEnd) {
//     let a = indexStart
//     indexStart = indexEnd
//     indexEnd = a
//     返回substring参数调换后的执行结果
// }else if( 如果任一参数小于 0 或为 NaN ){
//     indexStart或者indexEnd当做0
// }else if(如果任一参数大于 stringName.length){
//     indexStart或者indexEnd则被当作 stringName.length
// }
// log('abcdefg'.substring(2)) //cdefg
// log('abcdefg'.substring(2,2)) //空
// log('abcdefg'.substring(4,2)) //cd
// log('abcdefg'.substring(-2,10)) //abcdefg
// log('abcdefg'.substring(10,7)) //空

// 16.trim() : 创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。
// log('   Hello world!   '.trim()) //Hello world!

// 17.trimRight() : 从一个字符串的末端移除空白字符
// log('Hello world!   '.trimRight()) //Hello world!

// 18.trimLeft() : 从一个字符串的开头移除空白字符
// log('    Hello world!'.trimLeft(),) //Hello world!

// 19.toUpperCase()字母转换成大写
// log('sdfWE'.toUpperCase()) //SDFWE

// 20.toLowerCase()字母转换成小写
// log('ASDf'.toLowerCase()) //asdf

// 21.toString() : 返回指定对象的字符串形式。
// String 对象覆盖了Object 对象的 toString 方法；并没有继承 Object.toString()。对于 String 对象，toString 方法返回该对象的字符串形式，和 String.prototype.valueOf() 方法返回值一样。
// log(typeof new String('asd').toString()) //string

// 22.valueOf() : 返回一个String对象的原始值
// String 对象的 valueOf 方法返回一个String对象的原始值。该值等同于String.prototype.toString()。该方法通常在 JavaScript 内部被调用，而不是在代码里显式调用。
// log(typeof 'ssd'.valueOf()) //string
// log(typeof new String('dff').valueOf()) //string

// 23.replace(regexp|substr, newSubStr|function) ：返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。

// 24.match(regexp) ：检索返回一个字符串匹配正则表达式的的结果

// 25.search(regexp) 执行正则表达式和 String 对象之间的一个搜索匹配。





