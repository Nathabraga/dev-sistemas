document.getElementById('buscar').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const resultadoContainer = document.getElementById('resultado');

    if (cep.length !== 8) {
        resultadoContainer.innerHTML = '<p style="color: red;">Digite um CEP válido com 8 dígitos.</p>';
        return;
    }


    const xhr = new XMLHttpRequest();
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
           
            const dados = JSON.parse(xhr.responseText);

           
            if (dados.erro) {
                resultadoContainer.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
                return;
            }

            resultadoContainer.innerHTML = `
                <p><strong>Logradouro:</strong> ${dados.logradouro || 'N/A'}</p>
                <p><strong>Bairro:</strong> ${dados.bairro || 'N/A'}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>UF:</strong> ${dados.uf}</p>
            `;
        } else {
            resultadoContainer.innerHTML = '<p style="color: red;">Erro ao consultar o servidor.</p>';
        }
    };

    xhr.onerror = function() {
        resultadoContainer.innerHTML = '<p style="color: red;">Erro na conexão de rede.</p>';
    };

    xhr.send();
});