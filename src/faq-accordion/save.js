/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { faqItems } = attributes;

	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ faqItems.map( ( item, index ) => (
				<details key={ index } className="craftblocks-faq-item">
					<summary className="craftblocks-faq-question">
						<RichText.Content tagName="span" value={ item.question } />
					</summary>
					<div className="craftblocks-faq-answer">
						<RichText.Content tagName="p" value={ item.answer } />
					</div>
				</details>
			) ) }
		</div>
	);
}