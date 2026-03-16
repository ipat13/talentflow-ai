const fs = require('fs');
const path = require('path');

console.log('🔍 ANALISANDO IMPLEMENTAÇÃO MOBILE...\n');

// Configurações
const PROJECT_ROOT = __dirname;
const FILES_TO_CHECK = [
  'src/components/layout/Header.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/app/(dashboard)/dashboard/page.tsx',
  'src/app/(dashboard)/layout.tsx',
  'src/app/globals.css'
];

// Classes Tailwind para verificar
const MOBILE_CLASSES = {
  responsive: ['sm:', 'md:', 'lg:', 'xl:', '2xl:'],
  mobileSpecific: ['md:hidden', 'hidden md:block', 'sm:hidden', 'hidden sm:block'],
  touchTargets: ['min-h-', 'min-w-', 'p-', 'py-', 'px-', 'gap-'],
  textSizes: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
  gridColumns: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4']
};

// Resultados
const results = {
  totalFiles: 0,
  filesChecked: 0,
  mobileFeatures: {
    responsiveClasses: 0,
    breakpoints: 0,
    touchTargets: 0,
    mobileMenus: 0,
    gridResponsive: 0
  },
  issues: []
};

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, filePath), 'utf8');
    const lines = content.split('\n');
    
    console.log(`📄 Analisando: ${filePath}`);
    
    // Verificar classes responsivas
    let responsiveCount = 0;
    let breakpointCount = 0;
    let touchTargetCount = 0;
    let mobileMenuFound = false;
    let gridResponsiveFound = false;
    
    lines.forEach((line, index) => {
      // Verificar classes responsivas
      MOBILE_CLASSES.responsive.forEach(bp => {
        if (line.includes(bp)) {
          responsiveCount++;
          breakpointCount++;
        }
      });
      
      // Verificar classes mobile específicas
      MOBILE_CLASSES.mobileSpecific.forEach(cls => {
        if (line.includes(cls)) {
          responsiveCount++;
        }
      });
      
      // Verificar touch targets
      MOBILE_CLASSES.touchTargets.forEach(cls => {
        if (line.includes(cls)) {
          touchTargetCount++;
        }
      });
      
      // Verificar menu mobile
      if (line.includes('mobileMenu') || line.includes('MobileMenu') || 
          line.includes('hamburger') || line.includes('Hamburger')) {
        mobileMenuFound = true;
      }
      
      // Verificar grid responsivo
      MOBILE_CLASSES.gridColumns.forEach(cls => {
        if (line.includes(cls)) {
          gridResponsiveFound = true;
        }
      });
      
      // Verificar problemas comuns
      if (line.includes('width:') && !line.includes('max-width') && !line.includes('min-width')) {
        if (line.includes('px') && parseInt(line.match(/\d+px/)) < 300) {
          results.issues.push({
            file: filePath,
            line: index + 1,
            issue: 'Largura fixa pequena pode quebrar em mobile',
            code: line.trim()
          });
        }
      }
      
      if (line.includes('height:') && line.includes('px') && parseInt(line.match(/\d+px/)) < 44) {
        results.issues.push({
          file: filePath,
          line: index + 1,
          issue: 'Altura muito pequena para touch target',
          code: line.trim()
        });
      }
    });
    
    // Atualizar resultados
    results.filesChecked++;
    results.mobileFeatures.responsiveClasses += responsiveCount;
    results.mobileFeatures.breakpoints += breakpointCount;
    results.mobileFeatures.touchTargets += touchTargetCount;
    if (mobileMenuFound) results.mobileFeatures.mobileMenus++;
    if (gridResponsiveFound) results.mobileFeatures.gridResponsive++;
    
    console.log(`   ✅ Classes responsivas: ${responsiveCount}`);
    console.log(`   ✅ Breakpoints: ${breakpointCount}`);
    console.log(`   ✅ Touch targets: ${touchTargetCount}`);
    if (mobileMenuFound) console.log(`   ✅ Menu mobile encontrado`);
    if (gridResponsiveFound) console.log(`   ✅ Grid responsivo encontrado`);
    console.log('');
    
  } catch (error) {
    console.log(`   ❌ Erro ao ler arquivo: ${error.message}`);
  }
}

// Analisar CSS separadamente
function analyzeCSS() {
  const cssPath = path.join(PROJECT_ROOT, 'src/app/globals.css');
  try {
    const content = fs.readFileSync(cssPath, 'utf8');
    console.log('🎨 Analisando CSS Global...');
    
    // Verificar media queries
    const mediaQueries = content.match(/@media[^{]+\{/g) || [];
    const mobileMQ = mediaQueries.filter(mq => mq.includes('max-width') || mq.includes('767px'));
    const tabletMQ = mediaQueries.filter(mq => mq.includes('768px') || mq.includes('1023px'));
    
    console.log(`   ✅ Media Queries totais: ${mediaQueries.length}`);
    console.log(`   ✅ Media Queries mobile: ${mobileMQ.length}`);
    console.log(`   ✅ Media Queries tablet: ${tabletMQ.length}`);
    
    // Verificar regras importantes
    const hasTouchTargets = content.includes('min-height') && content.includes('min-width');
    const hasIOSFix = content.includes('font-size: 16px') && content.includes('iOS');
    const hasSafeAreas = content.includes('safe-area-inset');
    const hasTouchAction = content.includes('touch-action');
    
    if (hasTouchTargets) console.log(`   ✅ Touch targets definidos`);
    if (hasIOSFix) console.log(`   ✅ Fix para iOS encontrado`);
    if (hasSafeAreas) console.log(`   ✅ Safe areas implementadas`);
    if (hasTouchAction) console.log(`   ✅ Touch action configurado`);
    
    results.mobileFeatures.responsiveClasses += mediaQueries.length;
    
  } catch (error) {
    console.log(`   ❌ Erro ao analisar CSS: ${error.message}`);
  }
  console.log('');
}

// Executar análise
console.log('='.repeat(60));
FILES_TO_CHECK.forEach(file => {
  if (file !== 'src/app/globals.css') {
    analyzeFile(file);
  }
});
analyzeCSS();
console.log('='.repeat(60));

// Mostrar resumo
console.log('\n📊 RESUMO DA ANÁLISE:');
console.log('='.repeat(60));
console.log(`Arquivos analisados: ${results.filesChecked}/${FILES_TO_CHECK.length}`);
console.log(`Classes responsivas totais: ${results.mobileFeatures.responsiveClasses}`);
console.log(`Breakpoints utilizados: ${results.mobileFeatures.breakpoints}`);
console.log(`Touch targets identificados: ${results.mobileFeatures.touchTargets}`);
console.log(`Menus mobile encontrados: ${results.mobileFeatures.mobileMenus}`);
console.log(`Grids responsivos: ${results.mobileFeatures.gridResponsive}`);
console.log('');

// Mostrar issues
if (results.issues.length > 0) {
  console.log('⚠️  POSSÍVEIS PROBLEMAS ENCONTRADOS:');
  console.log('='.repeat(60));
  results.issues.forEach(issue => {
    console.log(`📄 ${issue.file}:${issue.line}`);
    console.log(`   ${issue.issue}`);
    console.log(`   Código: ${issue.code}`);
    console.log('');
  });
} else {
  console.log('✅ NENHUM PROBLEMA CRÍTICO ENCONTRADO!');
}

// Avaliação final
console.log('='.repeat(60));
console.log('🎯 AVALIAÇÃO FINAL:');
console.log('='.repeat(60));

const score = (
  (results.mobileFeatures.responsiveClasses > 50 ? 25 : results.mobileFeatures.responsiveClasses / 2) +
  (results.mobileFeatures.breakpoints > 20 ? 25 : results.mobileFeatures.breakpoints) +
  (results.mobileFeatures.touchTargets > 30 ? 20 : results.mobileFeatures.touchTargets / 1.5) +
  (results.mobileFeatures.mobileMenus >= 1 ? 15 : 0) +
  (results.mobileFeatures.gridResponsive >= 1 ? 15 : 0) -
  (results.issues.length * 5)
);

console.log(`Pontuação: ${Math.min(100, Math.max(0, score)).toFixed(1)}/100`);

if (score >= 80) {
  console.log('✅ EXCELENTE! O site está bem otimizado para mobile.');
} else if (score >= 60) {
  console.log('⚠️  BOM, mas pode melhorar alguns aspectos mobile.');
} else {
  console.log('❌ PRECISA DE MELHORIAS significativas para mobile.');
}

console.log('\n🔧 RECOMENDAÇÕES:');
if (results.mobileFeatures.touchTargets < 20) {
  console.log('   • Aumentar touch targets (mínimo 44x44px)');
}
if (results.mobileFeatures.mobileMenus < 1) {
  console.log('   • Implementar menu mobile/hamburguer');
}
if (results.issues.length > 0) {
  console.log('   • Corrigir os problemas listados acima');
}

console.log('\n🎉 ANÁLISE COMPLETA!');
console.log('Para testar visualmente, execute o servidor e acesse:');
console.log('• http://localhost:3000/test-mobile');
console.log('• http://localhost:3000/dashboard');
console.log('• Redimensione a janela para ver a responsividade');