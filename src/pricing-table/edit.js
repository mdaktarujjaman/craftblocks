/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Button } from '@wordpress/components';
import { plus, trash } from '@wordpress/icons';

export default function Edit( { attributes, setAttributes } ) {
	const {
		planName,
		currency,
		price,
		pricePeriod,
		features,
		buttonText,
		isFeatured,
		featuredBadgeText,
	} = attributes;

	const blockProps = useBlockProps( {
		className: isFeatured ? 'craftblocks-pricing-featured' : undefined,
	} );

	/**
	 * Update the text of a single feature item by its index.
	 *
	 * @param {number} index    Position of the feature in the array.
	 * @param {string} newValue New text for that feature.
	 */
	const updateFeature = ( index, newValue ) => {
		const updatedFeatures = [ ...features ];
		updatedFeatures[ index ] = newValue;
		setAttributes( { features: updatedFeatures } );
	};

	/**
	 * Add a new empty feature to the end of the list.
	 */
	const addFeature = () => {
		setAttributes( { features: [ ...features, 'New feature' ] } );
	};

	/**
	 * Remove a feature by its index.
	 *
	 * @param {number} index Position of the feature to remove.
	 */
	const removeFeature = ( index ) => {
		const updatedFeatures = features.filter( ( _, i ) => i !== index );
		setAttributes( { features: updatedFeatures } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Badge Settings" initialOpen={ true }>
					<ToggleControl
						label="Mark as Featured"
						checked={ isFeatured }
						onChange={ ( value ) => setAttributes( { isFeatured: value } ) }
					/>

					{ isFeatured && (
						<RichText
							tagName="p"
							value={ featuredBadgeText }
							onChange={ ( value ) => setAttributes( { featuredBadgeText: value } ) }
							placeholder="Badge text..."
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isFeatured && (
					<span className="craftblocks-pricing-badge">{ featuredBadgeText }</span>
				) }

				<RichText
					tagName="h3"
					className="craftblocks-pricing-plan-name"
					value={ planName }
					onChange={ ( value ) => setAttributes( { planName: value } ) }
					placeholder="Plan name..."
				/>

				<div className="craftblocks-pricing-price-row">
					<RichText
						tagName="span"
						className="craftblocks-pricing-currency"
						value={ currency }
						onChange={ ( value ) => setAttributes( { currency: value } ) }
						placeholder="$"
					/>
					<RichText
						tagName="span"
						className="craftblocks-pricing-price"
						value={ price }
						onChange={ ( value ) => setAttributes( { price: value } ) }
						placeholder="29"
					/>
					<RichText
						tagName="span"
						className="craftblocks-pricing-period"
						value={ pricePeriod }
						onChange={ ( value ) => setAttributes( { pricePeriod: value } ) }
						placeholder="/month"
					/>
				</div>

				<ul className="craftblocks-pricing-features">
					{ features.map( ( feature, index ) => (
						<li key={ index } className="craftblocks-pricing-feature-item">
							<RichText
								tagName="span"
								value={ feature }
								onChange={ ( newValue ) => updateFeature( index, newValue ) }
								placeholder="Feature text..."
							/>
							<Button
								icon={ trash }
								label="Remove feature"
								onClick={ () => removeFeature( index ) }
								isSmall
							/>
						</li>
					) ) }
				</ul>

				<Button
					icon={ plus }
					variant="secondary"
					onClick={ addFeature }
				>
					Add Feature
				</Button>

				<RichText
					tagName="span"
					className="craftblocks-pricing-button"
					value={ buttonText }
					onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					placeholder="Button text..."
				/>
			</div>
		</>
	);
}