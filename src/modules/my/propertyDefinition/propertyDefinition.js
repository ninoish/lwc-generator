import { LightningElement, api, track } from 'lwc';
import { sentenceCase, camelCase } from 'change-case';

export default class PropertyDefinition extends LightningElement {
    @api
    pid = '';

    @api
    targets = [];

    @track
    property = {
        name: '',
        targets: [],
        selectedTargets: [],
        type: '',
        description: '',
        label: '',
        default: '',
        apexClassName: '',
        sObjectName: '',
        min: '',
        max: '',
        placeholder: '',
        required: false,
        flowInput: true,
        flowOutput: true,
        datasource: ''
    };

    nonPropertyTargets = [
        'lightning__Tab',
        'lightningSnapin__ChatMessage',
        'lightningCommunity__Page',
        'lightningSnapin__Minimized',
        'lightningSnapin__PreChat',
        'lightningSnapin__ChatHeader'
    ];

    get enabledTargets() {
        const enabled = Object.values(this.targets)
            .filter((t) => t.enabled)
            .filter((t) => !this.nonPropertyTargets.includes(t.value));
        return enabled;
    }

    get isCommunityDefaultOnly() {
        return (
            this.property.selectedTargets.length === 1 &&
            this.property.selectedTargets[0] === 'lightningCommunity__Default'
        );
    }

    get isFlowOnly() {
        return (
            this.property.selectedTargets.length === 1 &&
            this.property.selectedTargets[0] === 'lightning__FlowScreen'
        );
    }

    get supportsFlow() {
        return !!this.property.selectedTargets.find(
            (t) => t === 'lightning__FlowScreen'
        );
    }

    get isApexClassType() {
        return this.property.type === 'apex';
    }

    get isSObjectType() {
        return this.property.type === 'sobject';
    }

    get isDateType() {
        return this.property.type === 'Date';
    }
    get isDateTimeType() {
        return this.property.type === 'DateTime';
    }

    get isBoolean() {
        return this.property.type === 'Boolean';
    }

    get isInteger() {
        return this.property.type === 'Integer';
    }

    get isString() {
        return this.property.type === 'String';
    }
    get propertyNameId() {
        return `propertyName_${this.pid}`;
    }
    get labelId() {
        return `label_${this.pid}`;
    }
    get descId() {
        return `desc_${this.pid}`;
    }
    get defaultId() {
        return `default_${this.pid}`;
    }

    get typeId() {
        return `type_${this.pid}`;
    }

    get apexClassNameId() {
        return `apexClassName_${this.pid}`;
    }

    get sObjectNameId() {
        return `sObjectName_${this.pid}`;
    }

    get minId() {
        return `min_${this.pid}`;
    }
    get maxId() {
        return `max_${this.pid}`;
    }
    get placeholderId() {
        return `placeholder_${this.pid}`;
    }
    get requiredId() {
        return `required_${this.pid}`;
    }
    get flowInputId() {
        return `flowInput_${this.pid}`;
    }
    get flowOutputId() {
        return `flowOutput_${this.pid}`;
    }
    get datasourceId() {
        return `datasource_${this.pid}`;
    }

    get isDefaultEnabled() {
        return (
            this.property.type !== 'apex' && this.property.type !== 'sobject'
        );
    }

    get defaultType() {
        switch (this.property.type) {
            case 'Integer':
                return 'number';
            case 'Date':
                return 'date';
            case 'DateTime':
                return 'datetime-local';
            default:
                return 'text';
        }
    }

    onChangeInput = (e) => {
        const key = e.target.attributes.name.value;
        const formattedValue = this.formatInputValue(key, e.target.value);
        this.property[key] = formattedValue;

        if (key === 'name' && !this.property.label) {
            this.property.label = sentenceCase(formattedValue);
        }
        this.updateProperty();
    };

    onChangeSelect = (e) => {
        const key = e.target.attributes.name.value;
        this.property[key] = e.target.value;
        this.updateProperty();
    };

    onChangeCheckbox = (e) => {
        const key = e.target.attributes.name.value;
        this.property[key] = e.target.checked;

        // fix for "You can’t make an output only property required.""
        if (
            this.supportsFlow &&
            key === 'required' &&
            e.target.checked &&
            !this.property.flowInput
        ) {
            this.property.flowInput = true;
        }
        this.updateProperty();
    };

    onChangeTargetCheckbox = (e) => {
        const { target, isChecked } = e.detail;
        if (isChecked) {
            this.property.selectedTargets.push(target.value);
        } else {
            const indexOfTarget = this.property.selectedTargets.indexOf(
                target.value
            );
            if (indexOfTarget > -1) {
                this.property.selectedTargets.splice(indexOfTarget, 1);
            }
        }
        this.updateProperty();
    };

    formatInputValue = (key, value) => {
        if (key === 'name') {
            return camelCase(value);
        }
        return value;
    };

    updateProperty = () => {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    ...this.property,
                    id: this.pid
                }
            })
        );
    };

    deletePropertyRow = () => {
        this.dispatchEvent(
            new CustomEvent('delete', {
                detail: this.pid
            })
        );
    };
}
