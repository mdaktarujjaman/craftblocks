/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		planName,
		currency,
		price,
		pricePeriod,
		features,
		buttonText,
		buttonUrl,
		isFeatured,
		featuredBadgeText,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: isFeatured ? 'craftblocks-pricing-featured' : undefined,
	} );

	return (
		<div { ...blockProps }>
			{ isFeatured && (
				<span className="craftblocks-pricing-badge">{ featuredBadgeText }</span>
			) }

			<RichText.Content
				tagName="h3"
				className="craftblocks-pricing-plan-name"
				value={ planName }
			/>

			<div className="craftblocks-pricing-price-row">
				<RichText.Content tagName="span" className="craftblocks-pricing-currency" value={ currency } />
				<RichText.Content tagName="span" className="craftblocks-pricing-price" value={ price } />
				<RichText.Content tagName="span" className="craftblocks-pricing-period" value={ pricePeriod } />
			</div>

			<ul className="craftblocks-pricing-features">
				{ features.map( ( feature, index ) => (
					<li key={ index } className="craftblocks-pricing-feature-item">
						{ feature }
					</li>
				) ) }
			</ul>

			<a href={ buttonUrl } className="craftblocks-pricing-button">
				<RichText.Content tagName="span" value={ buttonText } />
			</a>
		</div>
	);
}