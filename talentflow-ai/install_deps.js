const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando instalação de dependências...');
console.log('Diretório:', __dirname);

try {
  // Verificar se package.json existe
  const packageJsonPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json não encontrado!');
    process.exit(1);
  }

  console.log('📦 Lendo package.json...');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log(`📋 Projeto: ${packageJson.name} v${packageJson.version}`);
  
  const totalDeps = Object.keys(packageJson.dependencies || {}).length + 
                    Object.keys(packageJson.devDependencies || {}).length;
  console.log(`📊 Total de dependências: ${totalDeps}`);

  // Tentar instalar usando npm
  console.log('🔧 Executando npm install...');
  
  // Usar execSync com opções mais permissivas
  const options = {
    cwd: __dirname,
    stdio: 'inherit', // Mostrar output em tempo real
    shell: true
  };

  execSync('npm install --no-audit --no-fund', options);
  
  console.log('✅ Dependências instaladas com sucesso!');
  
  // Verificar se node_modules foi criado
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    const items = fs.readdirSync(nodeModulesPath);
    console.log(`📁 node_modules criado com ${items.length} itens`);
  } else {
    console.warn('⚠️  node_modules não foi criado');
  }

  // Iniciar servidor
  console.log('\n🚀 Iniciando servidor de desenvolvimento...');
  console.log('🌐 Acesse: http://localhost:3000');
  console.log('🛑 Pressione Ctrl+C para parar\n');
  
  execSync('npm run dev', options);

} catch (error) {
  console.error('❌ Erro durante a instalação:', error.message);
  
  // Tentar abordagem alternativa
  console.log('\n🔄 Tentando abordagem alternativa...');
  try {
    // Criar node_modules manualmente se necessário
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('Criando diretório node_modules...');
      fs.mkdirSync(nodeModulesPath, { recursive: true });
    }
    
    // Instalar dependências críticas uma a uma
    const criticalDeps = ['next', 'react', 'react-dom', 'tailwindcss'];
    console.log(`Instalando ${criticalDeps.length} dependências críticas...`);
    
    for (const dep of criticalDeps) {
      console.log(`Instalando ${dep}...`);
      execSync(`npm install ${dep} --no-save`, {
        cwd: __dirname,
        stdio: 'pipe',
        shell: true
      });
    }
    
    console.log('✅ Dependências críticas instaladas!');
    console.log('\n🚀 Tentando iniciar servidor...');
    execSync('npm run dev', {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });
    
  } catch (altError) {
    console.error('❌ Falha na abordagem alternativa:', altError.message);
    console.log('\n📋 Soluções alternativas:');
    console.log('1. Execute manualmente no terminal:');
    console.log('   cd "C:\\talentflow-ai\\talentflow-ai"');
    console.log('   npm install');
    console.log('   npm run dev');
    console.log('\n2. Ou use o PowerShell como Administrador');
    console.log('\n3. Verifique permissões da pasta');
  }
}