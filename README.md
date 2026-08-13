# 🧮 DKP Calculator (WoW Raids)

Aplicação web simples para cálculo de DKP baseada em raids do World of Warcraft, com suporte a múltiplas instâncias, modos (10/25) e configuração dinâmica de valores.

<a href="https://joseprandj.github.io/wowDkpCalculator/" target="_blank">
  🎯 Acesse o WoW DKP Calculator
</a>

## 🚀 Funcionalidades

* ✅ Cálculo de DKP por boss
* ✅ Modos:

  * Normal
  * Heroico
* ✅ Bônus customizável por boss
* ✅ Alternância entre raids:

  * Icecrown Citadel (ICC)
  * Ruby Sanctum (RS)
  * Trial of the Crusader (TOC)
* ✅ Alternância entre:

  * 10 players
  * 25 players
* ✅ Configuração de valores via modal
* ✅ Persistência com `localStorage`
* ✅ Reset de valores
* ✅ Aplicar modo em todos os bosses (Normal / Heroico)

---

## 🧠 Como funciona

### Estrutura de dados

Os dados são organizados em duas estruturas principais:

* `raids` → lista de bosses por instância
* `defaultConfigs` → valores padrão por:

  * raid
  * tamanho (10 / 25)
  * boss

Exemplo:

```javascript
"defaultConfigs": {
  "icc": {
    10: {
      "icc-0": { normal: 5, heroic: 10, bonus: 0 }
    }
  }
}
```

---

## 💾 Persistência

Os dados são armazenados no navegador usando `localStorage`.

Formato das chaves:

```plaintext
dkp-config-{raid}-{tamanho}
```

Exemplo:

```plaintext
dkp-config-icc-25
dkp-config-toc-10
```

---

## ⚙️ Configurações

Ao clicar em **⚙️ Configurações**, é possível:

* Editar valores de:

  * Normal
  * Heroico
  * Bônus
* Configurar separadamente:

  * modo 10
  * modo 25
* Salvar automaticamente (sem botão salvar)

---

## 🔄 Reset

O botão **Limpar Cache**:

* Remove os dados do `localStorage`
* Restaura os valores padrão
* Reseta o estado da interface

---

## 📁 Estrutura do Projeto

```plaintext
/
├── assets/icon
├── wowIcon.png
│
├── page/
├── ruby.html
├── toc.html
│
├── css/
│   ├── icc.css
│   ├── rs.css
│   └── toc.css
│
├── script/
│   ├── script.js
├── index.html
```

---

## 🔍 Detecção de página

O sistema identifica automaticamente a raid atual com base no nome do arquivo:

| Página     | Tipo |
| ---------- | ---- |
| index.html | icc  |
| ruby.html  | ruby |
| toc.html   | toc  |

---

## 🛠️ Tecnologias

* HTML5
* CSS3
* JavaScript (Vanilla)

Sem frameworks.

---

## 📱 Responsividade

* Layout adaptável (grid responsivo)
* Modal ajustado para mobile
* Inputs e botões otimizados para toque

---

## ▶️ Como executar

Basta acessar o site: 

---

## ⚠️ Observações

* Os dados ficam salvos localmente no navegador
* Limpar cache do navegador apaga as configurações
* Cada raid possui configurações independentes

---

## 👨‍💻 Autor
José Junior - 🔗 https://github.com/joseprandj
