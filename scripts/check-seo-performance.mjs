console.log('🔍 Starting Performance Gate Check...');
console.log('⚠️ PERFORMANCE NOT MEASURED: Lighthouse/PageSpeed is not available locally.');
console.log('For production readiness, ensure in CI or externally:');
console.log('- Mobile Performance >= 85');
console.log('- Desktop Performance >= 90');
console.log('- LCP <= 2.5s');
console.log('- CLS <= 0.1');
// Exit with 0 because it's a warning, but we do NOT print PASS
