document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.rewardPanel = new RewardPanel();
  document.body.appendChild(window.rewardPanel.element);
});