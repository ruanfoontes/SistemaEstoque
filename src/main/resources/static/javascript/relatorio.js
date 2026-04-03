function switchTab(tabname) {
    
    //REMOVE active dos botões
    document.querySelectorAll('.tab-link').forEach((btn) => {
        btn.classList.remove('active');
    });

    //REMOVE active das sessões
    document.querySelectorAll('.tab-content').forEach((sec) => {
        sec.classList.remove('active');
    });

    //ATIVAR botão correspondente
    const tagertBtn = document.getElementById('btn-tab-' + tabname);
    tagertBtn.classList.add('active');

    const targetSection = document.getElementById('section-' + tabname);
    targetSection.classList.add('active');
}