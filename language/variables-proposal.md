# Variables \[proposal\]

### Example variable declaration

Variable must be of one of known [Types](types-proposal.md).

{% tabs %}
{% tab title="example.x" %}
```javascript
let test = 12
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="example.x" %}
```javascript
let users: string[] = ['Annie', 'John']
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You don't need to declare variable type for basic types like numbers and strings - they are inferred automatically. Type declaration is necessary in complex data structures like `Arrays`, `Sets` etc.
{% endhint %}

## Definition

{% tabs %}
{% tab title="Declaration" %}
```javascript
 let <variable_name>: <type>? = <value>
```
{% endtab %}
{% endtabs %}

