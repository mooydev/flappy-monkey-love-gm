class RewardPanel {
    constructor() {
        this.element = this.createPanel();
        this.isVisible = false;
        this.updatePanel();
    }

    createPanel() {
        const wrapper = document.createElement('div');
        wrapper.className = 'reward-panel-wrapper hidden';

        // mostrar / ocultar
        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-rewards-button';
        toggleButton.innerHTML = '🎁';
        toggleButton.title = 'Ver Recompensas';
        
        const panel = document.createElement('div');
        panel.className = 'reward-panel';
        panel.innerHTML = `
            <div class="reward-panel-header">
                <h2>TUS VALES</h2>
                <button class="close-panel-button">×</button>
            </div>
            <div class="rewards-container">
                <div class="reward-item normal">
                    <img src="assets/images/ticket-normal.jpg" alt="Vale Normal">
                    <span class="reward-count" data-type="normal">0</span>
                    <button class="use-button" data-type="normal">Usar Vale</button>
                </div>
                <div class="reward-item silver">
                    <img src="assets/images/ticket-silver.jpg" alt="Vale Plata">
                    <span class="reward-count" data-type="silver">0</span>
                    <button class="use-button" data-type="silver">Usar Vale</button>
                </div>
                <div class="reward-item gold">
                    <img src="assets/images/ticket-gold.jpg" alt="Vale Oro">
                    <span class="reward-count" data-type="gold">0</span>
                    <button class="use-button" data-type="gold">Usar Vale</button>
                </div>
            </div>
        `;

        wrapper.appendChild(toggleButton);
        wrapper.appendChild(panel);

        //event listeners
        toggleButton.addEventListener('click', () => this.toggle());
        panel.querySelector('.close-panel-button').addEventListener('click', () => this.hide());
        
        panel.querySelectorAll('.use-button').forEach(button => {
            button.addEventListener('click', () => this.useReward(button.dataset.type));
        });

        return wrapper;
    }

    show() {
        this.isVisible = true;
        this.element.classList.remove('hidden');
        this.updatePanel();
    }

    hide() {
        this.isVisible = false;
        this.element.classList.add('hidden');
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    updatePanel() {
        const data = StorageManager.getData();
        Object.entries(data.rewards).forEach(([type, count]) => {
            const countElement = this.element.querySelector(`.reward-count[data-type="${type}"]`);
            const button = this.element.querySelector(`.use-button[data-type="${type}"]`);
            countElement.textContent = count;
            button.disabled = count === 0;
        });
    }

    useReward(type) {
        if (StorageManager.useReward(type)) {
            this.updatePanel();
            this.showUseNotification(type);
        }
    }

    showUseNotification(type) {
        const notification = document.createElement('div');
        notification.className = 'use-notification';
        notification.textContent = `¡Vale ${RewardManager.REWARDS[type].name} usado!`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }
}