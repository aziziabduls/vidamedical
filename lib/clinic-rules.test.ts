import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBMI,
  estimateCaloricTarget,
  formatWhatsAppBookingUrl,
  checkClinicOperatingStatus,
  VIDA_BOOST_TIERS,
  VIDA_HEALTH_PACKAGES,
  type BookingPayload,
} from './clinic-rules';

test('VIDA_BOOST_TIERS contains 4 tiers: Silver, Gold, Platinum, Diamond', () => {
  assert.equal(VIDA_BOOST_TIERS.length, 4);
  const tierIds = VIDA_BOOST_TIERS.map((t) => t.id);
  assert.deepEqual(tierIds, ['silver', 'gold', 'platinum', 'diamond']);
});

test('VIDA_HEALTH_PACKAGES all highlight the bonus body composition test', () => {
  assert.ok(VIDA_HEALTH_PACKAGES.length >= 3);
  for (const pkg of VIDA_HEALTH_PACKAGES) {
    assert.equal(pkg.includesBonusBodyComposition, true);
    const hasBonusInFeature = pkg.features.some((f) => f.includes('Body Composition'));
    assert.ok(hasBonusInFeature, `Package ${pkg.title} must list Body Composition`);
  }
});

test('calculateBMI correctly calculates and categorizes Asia-Pacific BMI', () => {
  // Height 170cm, Weight 65kg -> BMI ~ 22.5 (Normal)
  const normalResult = calculateBMI(65, 170);
  assert.equal(normalResult.bmi, 22.5);
  assert.equal(normalResult.category, 'Normal (Ideal)');
  assert.equal(normalResult.idealWeightRange.min, 53.5);
  assert.equal(normalResult.idealWeightRange.max, 66.2);

  // Height 170cm, Weight 75kg -> BMI ~ 26.0 (Obesitas Tingkat 1)
  const overweightResult = calculateBMI(75, 170);
  assert.equal(overweightResult.bmi, 26.0);
  assert.equal(overweightResult.category, 'Obesitas Tingkat 1');

  // Height 170cm, Weight 50kg -> BMI ~ 17.3 (Underweight)
  const underResult = calculateBMI(50, 170);
  assert.equal(underResult.bmi, 17.3);
  assert.equal(underResult.category, 'Berat Badan Kurang (Underweight)');
});

test('calculateBMI throws on invalid inputs', () => {
  assert.throws(() => calculateBMI(0, 170));
  assert.throws(() => calculateBMI(65, -10));
});

test('estimateCaloricTarget returns accurate metabolic estimates', () => {
  const result = estimateCaloricTarget(70, 175, 30, 'male', 'loss');
  assert.ok(result.bmr > 1500 && result.bmr < 1800);
  assert.ok(result.tdee > result.bmr);
  assert.ok(result.targetDailyCalories < result.tdee);
});

test('formatWhatsAppBookingUrl constructs valid URL with encoded payload', () => {
  const sampleBooking: BookingPayload = {
    patientName: 'Rina Sasmita',
    phone: '081234567890',
    serviceCategory: 'vidaboost',
    serviceOption: 'VidaBoost Platinum',
    preferredDate: '2026-11-12',
    preferredTime: '10:00 WIB',
    visitType: 'clinic',
    notes: 'Ingin infus setelah perjalanan luar kota.',
  };

  const url = formatWhatsAppBookingUrl(sampleBooking);
  assert.ok(url.startsWith('https://wa.me/628115750260?text='));
  assert.ok(url.includes('Rina%20Sasmita'));
  assert.ok(url.includes('VidaBoost%20Platinum'));
  assert.ok(url.includes('081234567890'));
});

test('checkClinicOperatingStatus returns appropriate structure', () => {
  const status = checkClinicOperatingStatus();
  assert.equal(typeof status.isOpen, 'boolean');
  assert.equal(typeof status.statusText, 'string');
  assert.equal(typeof status.details, 'string');
});
